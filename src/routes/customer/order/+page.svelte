<script lang="ts">
	import { onMount } from 'svelte';
	import { api_url } from '$lib/constants';
	import { Button } from '$lib/components/ui/button';
	import { toast } from 'svelte-sonner';
	import { image_url } from '$lib/constants';
	import { goto } from '$app/navigation';

	interface Style {
		id: string;
		name: string;
		filename: string;
		description: string;
		costperunit: number;
		fit_id: string;
		material_type_id: string;
		style_id: string;
	}

	interface MaterialVariant {
		id: string;
		name: string;
		filename: string;
		costperunit: number;
		materialtype: string;
	}

	let selectedStyle: Style = $state({
		id: '',
		name: '',
		filename: '',
		description: '',
		costperunit: 0,
		fit_id: '',
		material_type_id: '',
		style_id: ''
	});

	let selectedMaterial: MaterialVariant = $state({
		costperunit: -1,
		filename: '',
		id: '',
		materialtype: '',
		name: ''
	});

	let totalCost = $derived(selectedStyle.costperunit + selectedMaterial.costperunit);
	let availableFitTypes: Map<string, string> = $state(new Map());

	let availableMaterialTypes: Map<string, string> = $state(new Map());
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

	async function fetchStyleDetails() {
		const styleId = localStorage.getItem('selectedStyleId')!;
		try {
			const res = await fetch(`${api_url}/customer/style/${styleId}`);
			const data = await res.json();
			selectedStyle = data[0];
		} catch (error) {
			toast.error('Something went wrong while fetching styles');
			console.error('Error fetching styles:', error);
		}
	}

	async function fetchMaterialDetails() {
		const materialId = localStorage.getItem('selectedMaterialId')!;

		try {
			const res = await fetch(`${api_url}/customer/material/${materialId}`);
			const data = await res.json();
			selectedMaterial = data[0];
		} catch (error) {
			toast.error('Something went wrong while fetching materials');
			console.error('Error fetching materials:', error);
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

	let availableBaseStyleTypes: Map<string, string> = $state(new Map());
	async function fetchBaseStyleTypes() {
		try {
			const res = await fetch(`${api_url}/tailor/base-style-types`);
			const data = await res.json();
			data.forEach((element: { base_id: string; name: string }) => {
				availableBaseStyleTypes.set(element.base_id, element.name);
			});
		} catch (error) {
			console.error('Error fetching base style types:', error);
		}
	}

	let availableStyleTypes: Map<string, string[]> = $state(new Map());
	async function fetchStyleTypes() {
		try {
			const res = await fetch(`${api_url}/tailor/style-types`);
			const data = await res.json();

			data.forEach((item: { style_id: string; base_style_type: string; name: string }) => {
				availableStyleTypes.set(item.style_id, [item.base_style_type, item.name]);
			});
		} catch (error) {
			console.error('Error fetching style types:', error);
		}
	}

	onMount(() => {
		fetchStyleDetails();
		fetchMaterialDetails();
		fetchMaterialTypes();
		fetchFitTypes();
		fetchBaseStyleTypes();
		fetchStyleTypes();
	});

	let size = $state('');
	let specialInstructions = $state('');
	async function handleCheckout() {
		let data = {
			cloth_style_id: selectedStyle.id,
			material_id: selectedMaterial.id,
			size: size.trim(),
			special_instructions: specialInstructions.trim(),
			payment_amount: totalCost
		};

		try {
			let res = await fetch(`${api_url}/customer/place-order`, {
				method: 'POST',
				body: JSON.stringify(data),
				headers: { 'Content-Type': 'application/json' }
			});
			if (res.status == 201) {
				toast.success('Order placed successfully');
				goto('/customer');
			}
		} catch (error) {
			console.log('Something unexpected happened:', error);
			toast.error('Unable to place order.');
		}
	}
</script>

<div class="container mx-auto p-8">
	<h1 class="mb-6 text-2xl font-bold">Order Summary</h1>
	{#if selectedStyle.id != '' && selectedMaterial.id != ''}
		<div class="grid gap-8 md:grid-cols-2">
			<div class="space-y-4">
				<h2 class="text-xl font-semibold">Selected Style</h2>
				<div class="overflow-hidden rounded-lg">
					<img
						src={`${image_url}/image/original/${selectedStyle.filename}`}
						alt={selectedStyle.name}
						class="h-64 w-full object-cover"
					/>
				</div>
				<div class="space-y-2 rounded-lg bg-white p-4 shadow">
					<div class="border-b pb-2">
						<span class="font-semibold">Name:</span>
						<span class="ml-2">{selectedStyle.name}</span>
					</div>
					<div class="border-b pb-2">
						<span class="font-semibold">Fit Type:</span>
						<span class="ml-2">{availableFitTypes.get(selectedStyle.fit_id)}</span>
					</div>
					<div class="border-b pb-2">
						<span class="font-semibold">Base Style:</span>
						<span class="ml-2"
							>{availableBaseStyleTypes.get(
								availableStyleTypes.get(selectedStyle.style_id)![0]
							)}</span
						>
					</div>
					<div class="border-b pb-2">
						<span class="font-semibold">Style Type:</span>
						<span class="ml-2">{availableStyleTypes.get(selectedStyle.style_id)![1]}</span>
					</div>
					<div>
						<span class="font-semibold">Cost Per Unit:</span>
						<span class="ml-2">{selectedStyle.costperunit}</span>
					</div>
				</div>
			</div>

			<div class="space-y-4">
				<h2 class="text-xl font-semibold">Selected Material</h2>
				<div class="overflow-hidden rounded-lg">
					<img
						src={`${image_url}/image/original/${selectedMaterial.filename}`}
						alt={selectedMaterial.name}
						class="h-64 w-full object-cover"
					/>
				</div>
				<div class="space-y-2 rounded-lg bg-white p-4 shadow">
					<div class="border-b pb-2">
						<span class="font-semibold">Name:</span>
						{selectedMaterial.name}
					</div>
					<div class="border-b pb-2">
						<span class="font-semibold">Cost:</span>
						{selectedMaterial.costperunit}
					</div>
					<div class="border-b pb-2">
						<span class="font-semibold">Material Type:</span>
						{availableMaterialTypes.get(selectedMaterial.materialtype)}
					</div>
				</div>
			</div>
		</div>

		<div class="mt-8 space-y-4">
			<div class="rounded-lg bg-white p-4 shadow">
				<label for="size" class="block text-sm font-medium text-gray-700">Size</label>
				<input
					type="text"
					id="size"
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					bind:value={size}
					placeholder="Enter measurments here"
				/>
			</div>
			<div class="rounded-lg bg-white p-4 shadow">
				<label for="instructions" class="block text-sm font-medium text-gray-700"
					>Special Instructions</label
				>
				<textarea
					id="instructions"
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					bind:value={specialInstructions}
					placeholder="Any specific instructions..."
				></textarea>
			</div>
		</div>

		<div class="mt-8 rounded-lg border bg-white p-4 shadow">
			<p class="text-xl font-bold">Total Cost: {totalCost}</p>
			<Button class="mt-4" on:click={handleCheckout}>Proceed to Checkout</Button>
		</div>
	{:else}
		<p>Loading order details...</p>
	{/if}
</div>
