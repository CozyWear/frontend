<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent } from '$lib/components/ui/card';
	import { Plus } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { api_url, image_url } from '$lib/constants';
	import { toast } from 'svelte-sonner';

	interface Material {
		id: string;
		sort_id: number;
		name: string;
		filename: string;
		costperunit: number;
		stockquantity: number;
	}

	interface MaterialsResponse {
		items: Material[];
		total: number;
		page: number;
		per_page: number;
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

			console.log(materials);
		} catch (error) {
			toast.error('Something went wrong while fetching materials');
			console.error('Error fetching materials:', error);
		} finally {
			loading = false;
		}
	}

	onMount(fetchMaterials);

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
					class="h-48 w-full object-cover"
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
				</CardContent>
			</Card>
		{/each}
	</div>

	<div class="mt-8 flex justify-center">
		<Button on:click={prevPage} disabled={page === 1}>Previous</Button>
		<span class="px-4">Page {page}</span>
		<Button on:click={nextPage} disabled={page * per_page >= total}>Next</Button>
	</div>

	<Button class="fixed bottom-8 right-8 h-16 w-16 rounded-full" href="/merchant/add-item">
		<Plus class="h-8 w-8" />
	</Button>
</div>
