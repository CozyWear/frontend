<script lang="ts">
	import { onMount } from 'svelte';
	import { Card, CardContent } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { api_url, image_url } from '$lib/constants';

	let selectedStyle: any = null;
	let availableFitTypes: Map<string, string> = new Map();
	let availableMaterialTypes: Map<string, string> = new Map();

	async function fetchFitTypes() {
		const fitRes = await fetch(`${api_url}/tailor/fit-types`);
		const fitData = await fitRes.json();
		fitData.forEach((element: { fit_id: string; name: string }) => {
			availableFitTypes.set(element.fit_id, element.name);
		});
		console.log('availableFitTypes:', availableFitTypes);
	}

	async function fetchMaterialTypes() {
		const materialRes = await fetch(`${api_url}/merchant/material-types`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (!materialRes.ok) {
			console.error('Error fetching material types:', materialRes.statusText);
			return;
		}
		const materialData = await materialRes.json();
		materialData.forEach((element: { type_id: string; name: string }) => {
			availableMaterialTypes.set(element.type_id, element.name);
		});
		console.log('availableMaterialTypes:', availableMaterialTypes);
	}

	onMount(async () => {
		const data = localStorage.getItem('selectedStyle');
		if (data) {
			selectedStyle = JSON.parse(data);
			console.log('selectedStyle:', selectedStyle);
			await fetchFitTypes();
			await fetchMaterialTypes();
		}
	});
</script>

<div class="container mx-auto px-4 py-8">
	{#if selectedStyle}
		<Card class="overflow-hidden">
			<img
				src={`${image_url}/image/original/${selectedStyle.filename}`}
				alt={selectedStyle.name}
				class="w-full object-cover"
				style="height:280px;"
			/>
			<CardContent class="p-4">
				<div class="mb-2">
					<span class="font-semibold">Style Name:</span>
					<span class="ml-2">{selectedStyle.name}</span>
				</div>
				<div class="mb-2">
					<span class="font-semibold">Cost Per Unit:</span>
					<span class="ml-2">{selectedStyle.costperunit}</span>
				</div>
				<div class="mb-2">
					<span class="font-semibold">Description:</span>
					<span class="ml-2">{selectedStyle.description}</span>
				</div>
				<div class="mb-2">
					<span class="font-semibold">Fit Type:</span>
					<span class="ml-2">{availableFitTypes.get(selectedStyle.fit_id)}</span>
				</div>
				<div class="mb-2">
					<span class="font-semibold">Material Type:</span>
					<span class="ml-2">{availableMaterialTypes.get(selectedStyle.material_type_id)}</span>
				</div>
			</CardContent>
		</Card>
	{:else}
		<p>Loading style data...</p>
	{/if}
</div>
