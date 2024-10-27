<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent } from '$lib/components/ui/card';
	import { Plus, Edit, Trash, ArrowLeft, ArrowRight } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { api_url, image_url } from '$lib/constants';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { Dialog, DialogContent, DialogHeader, DialogTitle } from '$lib/components/ui/dialog';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';

	let showEditDialog = $state(false);
	let editingMaterial: Material | null = $state(null);

	let availableMaterialTypes: Map<string, string> = $state(new Map());

	interface Material {
		id: string;
		sort_id: number;
		name: string;
		filename: string;
		costperunit: number;
		stockquantity: number;
		materialtype: string;
	}

	interface MaterialsResponse {
		items: Material[];
		total: number;
		page: number;
		per_page: number;
	}

	interface MaterialType {
		type_id: string;
		name: string;
	}

	let materials: MaterialsResponse = $state({
		items: [],
		total: 0,
		page: 1,
		per_page: 10
	});

	let page = $state(1);
	let per_page = $state(10);
	let total = $state(0);
	let loading = false;

	async function fetchMaterials() {
		loading = true;
		try {
			const res = await fetch(`${api_url}/merchant/materials?page=${page}&per_page=${per_page}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			const data = await res.json();
			materials = data;
			total = materials.total;
		} catch (error) {
			toast.error('Something went wrong while fetching materials');
			console.error('Error fetching materials:', error);
		} finally {
			loading = false;
		}
	}

	async function handleEdit(material: Material) {
		editingMaterial = { ...material };
		showEditDialog = true;
	}

	async function saveChanges() {
		if (!editingMaterial) return;

		try {
			const res = await fetch(`${api_url}/merchant/edit`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					id: editingMaterial.id,
					name: editingMaterial.name,
					cost_per_unit: editingMaterial.costperunit,
					stock_quantity: editingMaterial.stockquantity,
					material_type_id: editingMaterial.materialtype
				})
			});

			if (res.ok) {
				materials.items = materials.items.map((item) =>
					item.id === editingMaterial?.id ? editingMaterial : item
				);
				showEditDialog = false;
				toast.success('Material updated successfully');
			}
		} catch (error) {
			toast.error('Failed to update material');
			console.log('Error updating material:', error);
		}
	}

	async function deleteMaterial(id: string) {
		try {
			const res = await fetch(`${api_url}/merchant/remove/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (res.ok) {
				materials.items = materials.items.filter((material) => material.id !== id);
				materials.total -= 1;
				toast.success('Material deleted successfully');
			} else {
				throw new Error('Failed to delete material');
			}
		} catch (error) {
			toast.error('Something went wrong while deleting the material');
			console.error('Error deleting material:', error);
		}
	}

	onMount(async () => {
		fetchMaterials();

		const res = await fetch(`${api_url}/merchant/material-types`);
		const data = await res.json();

		data.forEach((element: MaterialType) => {
			availableMaterialTypes.set(element.type_id, element.name);
		});

		console.log(availableMaterialTypes);
	});

	function nextPage() {
		if (page * per_page < total) {
			page += 1;
			fetchMaterials();
		}
	}

	function prevPage() {
		if (page > 1) {
			page -= 1;
			fetchMaterials();
		}
	}
</script>

<div class="container mx-auto px-4 py-8">
	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
		{#each materials.items as material (material.id)}
			<Card class="overflow-hidden">
				<img
					src={`${image_url}/image/original/${material.filename}`}
					alt={material.name}
					class="w-full object-cover"
					style="height:280px;"
				/>
				<CardContent class="p-4">
					<div class="mb-2">
						<span class="font-semibold">Material Name:</span>
						<span class="ml-2">{material.name}</span>
					</div>
					<div class="mb-2">
						<span class="font-semibold">Cost Per Unit:</span>
						<span class="ml-2">{material.costperunit}</span>
					</div>
					<div class="mb-2">
						<span class="font-semibold">Stock Quantity:</span>
						<span class="ml-2">{material.stockquantity}</span>
					</div>
					<div class="mb-2">
						<span class="font-semibold">Material Type:</span>
						<span class="ml-2">{availableMaterialTypes.get(material.materialtype)}</span>
					</div>
					<div style="display: flex; justify-content: space-between;">
						<Button onclick={() => handleEdit(material)}><Edit class="h-4 w-4" /></Button>

						<Button onclick={() => deleteMaterial(material.id)}><Trash class="h-4 w-4" /></Button>
					</div>
				</CardContent>
			</Card>
		{/each}
		<Card class="flex flex-col items-center justify-center border-0">
			<CardContent>
				<div>
					<Button class="h-16 w-16 rounded-full" on:click={() => goto('/merchant/add-item')}>
						<Plus class="h-8 w-8" />
					</Button>
				</div>
			</CardContent>
		</Card>
	</div>

	<div class=" mt-4 flex items-center justify-center">
		<div>
			<Button on:click={prevPage} disabled={page === 1}><ArrowLeft /></Button>
			<span>Page {page}</span>
			<Button on:click={nextPage} disabled={page * per_page >= total}><ArrowRight /></Button>
		</div>
	</div>

	<Dialog bind:open={showEditDialog}>
		<DialogContent class="sm:max-w-[425px]">
			<DialogHeader>
				<DialogTitle>Edit Material</DialogTitle>
			</DialogHeader>
			{#if editingMaterial}
				<div class="grid gap-4 py-4">
					<div class="grid gap-2">
						<Label for="name">Material Name</Label>
						<Input id="name" bind:value={editingMaterial.name} />
					</div>
					<div class="grid gap-2">
						<Label for="materialType">Material Type</Label>
						<select
							id="materialType"
							bind:value={editingMaterial.materialtype}
							class="w-full rounded border px-2 py-1"
						>
							{#each Array.from(availableMaterialTypes) as [typeId, typeName]}
								<option value={typeId}>{typeName}</option>
							{/each}
						</select>
					</div>
					<div class="grid gap-2">
						<Label for="cost">Cost Per Unit</Label>
						<Input id="cost" type="number" bind:value={editingMaterial.costperunit} min="0" />
					</div>
					<div class="grid gap-2">
						<Label for="stock">Stock Quantity</Label>
						<Input id="stock" type="number" bind:value={editingMaterial.stockquantity} min="0" />
					</div>
				</div>
				<div class="flex justify-end gap-2">
					<Button variant="outline" on:click={() => (showEditDialog = false)}>Cancel</Button>
					<Button on:click={saveChanges}>Save changes</Button>
				</div>
			{/if}
		</DialogContent>
	</Dialog>
</div>
