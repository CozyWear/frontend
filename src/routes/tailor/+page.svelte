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
	let editingStyle: Style | null = $state(null);

	let availableFitTypes: Map<string, string> = $state(new Map());
	let availableStyleTypes: Map<string, string[]> = $state(new Map());
	let availableMaterialTypes: Map<string, string> = $state(new Map());
	let availableBaseStyleTypes: Map<string, string> = $state(new Map());

	onMount(async () => {
		fetchStyles();
	});

	interface Style {
		id: string;
		sort_id: number;
		name: string;
		filename: string;
		costperunit: number;
		description: string;
		fit_id: string;
		style_id: string;
		material_type_id: string;
		base_style_type: string;
	}

	interface StylesResponse {
		items: Style[];
		total: number;
		page: number;
		per_page: number;
	}

	let styles: StylesResponse = $state({
		items: [],
		total: 0,
		page: 1,
		per_page: 10
	});

	let page = $state(1);
	let per_page = $state(10);
	let total = $state(0);
	let loading = false;

	async function fetchStyles() {
		const fitRes = await fetch(`${api_url}/tailor/fit-types`);
		const fitData = await fitRes.json();
		fitData.forEach((element: { fit_id: string; name: string }) => {
			availableFitTypes.set(element.fit_id, element.name);
		});

		const materialRes = await fetch(`${api_url}/merchant/material-types`);
		const materialData = await materialRes.json();
		materialData.forEach((element: { type_id: string; name: string }) => {
			availableMaterialTypes.set(element.type_id, element.name);
		});

		const baseStyleTypeRes = await fetch(`${api_url}/tailor/base-style-types`);
		const baseStyleTypeData = await baseStyleTypeRes.json();
		baseStyleTypeData.forEach((element: { base_id: string; name: string }) => {
			availableBaseStyleTypes.set(element.base_id, element.name);
		});
		const StyleTypeRes = await fetch(`${api_url}/tailor/style-types`);
		const StyleTypeData = await StyleTypeRes.json();
		StyleTypeData.forEach(
			(element: { style_id: string; base_style_type: string; name: string }) => {
				availableStyleTypes.set(element.style_id, [element.base_style_type, element.name]);
			}
		);

		loading = true;
		try {
			const res = await fetch(`${api_url}/tailor/styles?page=${page}&per_page=${per_page}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const data = await res.json();
			styles = data;
			styles.items.map((item) => {
				item.base_style_type = availableStyleTypes
					.entries()
					.find((element) => element[0] == item.style_id)![1][0];
			});
			total = styles.total;
		} catch (error) {
			toast.error('Something went wrong while fetching styles');
			console.error('Error fetching styles:', error);
		} finally {
			loading = false;
		}
	}

	async function handleEdit(style: Style) {
		editingStyle = { ...style };
		showEditDialog = true;
	}

	async function saveChanges() {
		if (!editingStyle) return;

		try {
			const res = await fetch(`${api_url}/tailor/edit`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(editingStyle)
			});

			if (res.ok) {
				styles.items = styles.items.map((item) =>
					item.id === editingStyle?.id ? editingStyle : item
				);
				showEditDialog = false;
				toast.success('Style updated successfully');
			}
		} catch (error) {
			toast.error('Failed to update style');
			console.error('Error updating style:', error);
		}
	}

	async function deleteStyle(id: string) {
		try {
			const res = await fetch(`${api_url}/tailor/remove/${id}`, {
				method: 'DELETE'
			});

			if (res.ok) {
				styles.items = styles.items.filter((style) => style.id !== id);
				styles.total -= 1;
				toast.success('Style deleted successfully');
			} else {
				throw new Error('Failed to delete style');
			}
		} catch (error) {
			toast.error('Something went wrong while deleting the style');
			console.error('Error deleting style:', error);
		}
	}

	onMount(() => {
		fetchStyles();
	});

	function nextPage() {
		if (page * per_page < total) {
			page += 1;
			fetchStyles();
		}
	}

	function prevPage() {
		if (page > 1) {
			page -= 1;
			fetchStyles();
		}
	}
</script>

<div class="container mx-auto px-4 py-8">
	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
		{#each styles.items as style (style.id)}
			<Card class="overflow-hidden">
				<img
					src={`${image_url}/image/original/${style.filename}`}
					alt={style.name}
					class="w-full object-cover"
					style="height:280px;"
				/>
				<CardContent class="p-4">
					<div class="mb-2">
						<span class="font-semibold">Style Name:</span>
						<span class="ml-2">{style.name}</span>
					</div>
					<div class="mb-2">
						<span class="font-semibold">Cost Per Unit:</span>
						<span class="ml-2">{style.costperunit}</span>
					</div>
					<div class="mb-2">
						<span class="font-semibold">Description:</span>
						<span class="ml-2">{style.description}</span>
					</div>
					<div class="mb-2">
						<span class="font-semibold">Fit Type:</span>
						<span class="ml-2">{availableFitTypes.get(style.fit_id)}</span>
					</div>
					<div class="mb-2">
						<span class="font-semibold">Style Type:</span>
						<span class="ml-2">{availableStyleTypes.get(style.style_id)![1]}</span>
					</div>
					<div class="mb-2">
						<span class="font-semibold">Material Type required:</span>
						<span class="ml-2">{availableMaterialTypes.get(style.material_type_id)}</span>
					</div>
					<div class="mb-2">
						<span class="font-semibold">Base Type:</span>
						<span class="ml-2">{availableBaseStyleTypes.get(style.base_style_type)}</span>
					</div>
					<div style="display: flex; justify-content: space-between;">
						<Button on:click={() => handleEdit(style)}><Edit class="h-4 w-4" /></Button>
						<Button on:click={() => deleteStyle(style.id)}><Trash class="h-4 w-4" /></Button>
					</div>
				</CardContent>
			</Card>
		{/each}
		<Card class="flex flex-col items-center justify-center border-0">
			<CardContent>
				<div>
					<Button class="h-16 w-16 rounded-full" on:click={() => goto('/tailor/add-item')}>
						<Plus class="h-8 w-8" />
					</Button>
				</div>
			</CardContent>
		</Card>
	</div>

	<div class="mt-4 flex items-center justify-center">
		<div>
			<Button on:click={prevPage} disabled={page === 1}><ArrowLeft /></Button>
			<span>Page {page}</span>
			<Button on:click={nextPage} disabled={page * per_page >= total}><ArrowRight /></Button>
		</div>
	</div>

	<Dialog bind:open={showEditDialog}>
		<DialogContent class="sm:max-w-[425px]">
			<DialogHeader>
				<DialogTitle>Edit Style</DialogTitle>
			</DialogHeader>
			{#if editingStyle}
				<div class="grid gap-4 py-4">
					<div class="grid gap-2">
						<Label for="name">Style Name</Label>
						<Input id="name" bind:value={editingStyle.name} />
					</div>
					<div class="grid gap-2">
						<Label for="cost">Cost Per Unit</Label>
						<Input id="cost" type="number" bind:value={editingStyle.costperunit} min="0" />
					</div>
					<div class="grid gap-2">
						<Label for="description">Description</Label>
						<Input id="description" bind:value={editingStyle.description} />
					</div>
					<div class="grid gap-2">
						<Label for="fitType">Fit Type</Label>
						<select
							id="fitType"
							bind:value={editingStyle.fit_id}
							class="w-full rounded border px-2 py-1"
						>
							{#each Array.from(availableFitTypes) as [typeId, typeName]}
								<option value={typeId}>{typeName}</option>
							{/each}
						</select>
					</div>
					<div class="grid gap-2">
						<Label for="baseStyleType">Base Style Type</Label>
						<select
							id="baseStyleType"
							bind:value={editingStyle.base_style_type}
							class="w-full rounded border px-2 py-1"
						>
							{#each Array.from(availableBaseStyleTypes) as [typeId, typeName]}
								<option value={typeId}>{typeName}</option>
							{/each}
						</select>
					</div>
					<div class="grid gap-2">
						<Label for="styleType">Style Type</Label>
						<select
							id="styleType"
							bind:value={editingStyle.style_id}
							class="w-full rounded border px-2 py-1"
						>
							{#each Array.from(availableStyleTypes
									.entries()
									.filter(([_, value]) => value[0] == editingStyle!.base_style_type)) as [typeId, typeName]}
								<option value={typeId}>{typeName[1]}</option>
							{/each}
						</select>
					</div>
					<div class="grid gap-2">
						<Label for="materialType">Material Type Required</Label>
						<select
							id="materialType"
							bind:value={editingStyle.material_type_id}
							class="w-full rounded border px-2 py-1"
						>
							{#each Array.from(availableMaterialTypes) as [typeId, typeName]}
								<option value={typeId}>{typeName}</option>
							{/each}
						</select>
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
