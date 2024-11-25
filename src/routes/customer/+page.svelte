<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent } from '$lib/components/ui/card';
	import { Dialog, DialogContent, DialogHeader, DialogClose } from '$lib/components/ui/dialog';
	import { onMount } from 'svelte';
	import { api_url, image_url } from '$lib/constants';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	interface Style {
		id: string;
		name: string;
		filename: string;
		description: string;
		costperunit: number;
		fit_id: string;
		material_type_id: string;
	}

	interface MaterialVariant {
		id: string; // Assuming each variant has an id
		name: string;
		filename: string;
		costperunit: number;
	}

	interface MaterialVariants {
		items: Array<MaterialVariant>;
		total: number;
		page: number;
		per_page: number;
	}

	let selectedStyleId: string = $state('');
	let selectedMaterialId: string = $state('');

	let styles: { items: Array<Style>; page: number; per_page: number; total: number } = $state({
		items: [],
		page: 1,
		per_page: 10,
		total: 0
	});
	let stylesPage = $state(1);
	let stylesPerPage = $state(10);
	let totalStyles = $state(0);

	let materialsPage = $state(1);
	let materialsPerPage = $state(10);
	let totalMaterials = $state(0);

	let selectedStyle: Style = $state({
		id: '',
		name: '',
		filename: '',
		description: '',
		costperunit: 0,
		fit_id: '',
		material_type_id: ''
	});
	let showDialog = $state(false);
	let showMaterialDialog = $state(false);
	let availableFitTypes: Map<string, string> = $state(new Map());
	let availableMaterialTypes: Map<string, string> = $state(new Map());
	let materialVariants: MaterialVariants = $state({
		items: [],
		total: 0,
		page: 1,
		per_page: 10
	});

	onMount(() => {
		fetchStyles();
		fetchFitTypes();
		fetchMaterialTypes();
	});

	async function fetchStyles() {
		try {
			const res = await fetch(
				`${api_url}/customer/styles?page=${stylesPage}&per_page=${stylesPerPage}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);
			const data = await res.json();
			styles = data;
		} catch (error) {
			toast.error('Something went wrong while fetching styles');
			console.error('Error fetching styles:', error);
		}
	}

	async function fetchFitTypes() {
		try {
			const fitRes = await fetch(`${api_url}/tailor/fit-types`);
			const fitData = await fitRes.json();
			fitData.forEach((element: { fit_id: string; name: string }) => {
				availableFitTypes.set(element.fit_id, element.name);
			});
		} catch (error) {
			toast.error('Failed to fetch fit types');
			console.error('Error fetching fit types:', error);
		}
	}

	async function fetchMaterialTypes() {
		try {
			const materialRes = await fetch(`${api_url}/merchant/material-types`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const materialData = await materialRes.json();
			materialData.forEach((element: { type_id: string; name: string }) => {
				availableMaterialTypes.set(element.type_id, element.name);
			});
		} catch (error) {
			toast.error('Failed to fetch material types');
			console.error('Error fetching material types:', error);
		}
	}

	function handleCustomerButton(styleId: string) {
		selectedStyleId = styleId;
		selectedStyle = styles.items.find((style) => style.id === styleId)!;
		if (selectedStyle) {
			fetchMaterialVariants(selectedStyle.material_type_id);
			showDialog = true;
		}
	}

	/*function handleCustomerButton(styleId: string) {
	selectedStyle = styles.items.find((style) => style.id === styleId)!;
	if (selectedStyle) {
		localStorage.setItem('selectedStyle', JSON.stringify(selectedStyle));
		goto('/style');
	}
}*/

	function closeDialog() {
		selectedStyle = {
			id: '',
			name: '',
			filename: '',
			description: '',
			costperunit: 0,
			fit_id: '',
			material_type_id: ''
		};
		showDialog = false;
	}

	function processOrder(mateiralID: string) {
		selectedMaterialId = mateiralID;
		if (selectedStyleId != '' && selectedMaterialId != '') {
			localStorage.setItem('selectedStyleId', selectedStyleId);
			localStorage.setItem('selectedMaterialId', selectedMaterialId);
			goto('/customer/order');
		} else {
			toast.error('Please select a style and a material');
		}
	}

	async function fetchMaterialVariants(materialTypeId: string) {
		try {
			const res = await fetch(
				`${api_url}/customer/materials/${materialTypeId}?page=${materialsPage}&per_page=${materialsPerPage}`
			);
			const data = await res.json();
			console.log(data);
			materialVariants = data;
		} catch (error) {
			toast.error('Failed to fetch material variants');
			console.error('Error fetching material variants:', error);
		}
	}

	function handleChooseMaterial() {
		if (selectedStyle) {
			fetchMaterialVariants(selectedStyle.material_type_id);
			showDialog = false;
			showMaterialDialog = true;
		}
	}

	function closeMaterialDialog() {
		showMaterialDialog = false;
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
						<span class="font-semibold">Material Type:</span>
						<span class="ml-2">{availableMaterialTypes.get(style.material_type_id)}</span>
					</div>
					<Button onclick={() => handleCustomerButton(style.id)} class="mt-4">View Style</Button>
				</CardContent>
			</Card>
		{/each}
	</div>

	<Dialog open={showDialog}>
		<DialogContent class="p-6">
			<DialogHeader>
				<h2>{selectedStyle?.name}</h2>
			</DialogHeader>
			{#if selectedStyle}
				<img
					src={`${image_url}/image/original/${selectedStyle.filename}`}
					alt={selectedStyle.name}
					class="w-full object-cover"
				/>
				<p><strong>Description:</strong> {selectedStyle.description}</p>
				<p><strong>Cost Per Unit:</strong> {selectedStyle.costperunit}</p>
				<p><strong>Fit Type:</strong> {availableFitTypes.get(selectedStyle.fit_id)}</p>
				<p>
					<strong>Material Type:</strong>
					{availableMaterialTypes.get(selectedStyle.material_type_id)}
				</p>
				<Button onclick={handleChooseMaterial} class="mt-4">Choose Material</Button>
			{/if}
			<DialogClose onclick={closeDialog} class="mt-4">Close</DialogClose>
		</DialogContent>
	</Dialog>

	<Dialog open={showMaterialDialog}>
		<DialogContent class="p-6">
			<DialogHeader>
				<h2 class="mb-4 text-xl font-bold">Material Variants</h2>
			</DialogHeader>
			{#if materialVariants.items.length > 0}
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
					{#each materialVariants.items as variant (variant.id)}
						<Card class="overflow-hidden">
							<img
								src={`${image_url}/image/original/${variant.filename}`}
								alt={variant.name}
								class="h-48 w-full object-cover"
							/>
							<CardContent class="p-4">
								<div class="mb-2">
									<span class="font-semibold">Material:</span>
									<span class="ml-2">{variant.name}</span>
								</div>
								<div class="mb-2">
									<span class="font-semibold">Cost:</span>
									<span class="ml-2">{variant.costperunit}</span>
								</div>
								<Button class="mt-2 w-full" onclick={() => processOrder(variant.id)}
									>Select Material</Button
								>
							</CardContent>
						</Card>
					{/each}
				</div>
			{:else}
				<p>No variants available.</p>
			{/if}
			<DialogClose onclick={closeMaterialDialog} class="mt-4">Close</DialogClose>
		</DialogContent>
	</Dialog>
</div>
