<script lang="ts">
	import { onMount } from 'svelte';
	import { Pagination } from '$lib/components/ui/pagination';
	import { api_url } from '$lib/constants';

	interface OrderResponse {
		order_id: string;
		customer_id: string;
		payment_id: string;
		cloth_style_id: string;
		material_id: string;
		size: string;
		special_instructions: string | null;
		created_at: number;
	}
	interface PaginatedResponse<T> {
		items: T[];
		total: number;
		page: number;
		per_page: number;
	}

	let orders: PaginatedResponse<OrderResponse> = $state({
		items: [],
		total: 0,
		page: 0,
		per_page: 0
	});

	let totalOrders = $state(0);
	let currentPage = $state(1);
	let perPage = $state(10);

	const fetchOrderHistory = async (page: number) => {
		const res = await fetch(`${api_url}/customer/order-history`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				page,
				per_page: perPage
			})
		});

		const data = await res.json();
		orders = data;
		totalOrders = data.total;
		currentPage = data.page;
	};

	onMount(() => {
		fetchOrderHistory(currentPage);
	});

	const handlePageChange = (page: number) => {
		fetchOrderHistory(page);
	};
</script>

<section class="order-history-container mx-auto max-w-4xl p-4">
	<h2 class="mb-4 text-xl font-bold">Order History</h2>

	{#if orders.items.length > 0}
		<table class="w-full border-collapse rounded-lg bg-white shadow">
			<thead>
				<tr class="border-b text-left">
					<th class="p-2">Order ID</th>
					<th class="p-2">Customer ID</th>
					<th class="p-2">Payment ID</th>
					<th class="p-2">Cloth Style</th>
					<th class="p-2">Material</th>
					<th class="p-2">Size</th>
					<th class="p-2">Special Instructions</th>
					<th class="p-2">Created At</th>
				</tr>
			</thead>
			<tbody>
				{#each orders.items as order}
					<tr class="border-b hover:bg-gray-100">
						<td class="p-2">{order.order_id}</td>
						<td class="p-2">{order.customer_id}</td>
						<td class="p-2">{order.payment_id}</td>
						<td class="p-2">{order.cloth_style_id}</td>
						<td class="p-2">{order.material_id}</td>
						<td class="p-2">{order.size}</td>
						<td class="p-2">{order.special_instructions || 'N/A'}</td>
						<td class="p-2">{new Date(order.created_at * 1000).toLocaleString()}</td>
					</tr>
				{/each}
			</tbody>
		</table>

		<Pagination
			totalItems={totalOrders}
			itemsPerPage={perPage}
			{currentPage}
			onPageChange={handlePageChange}
		/>
	{:else}
		<p class="mt-4 text-center">No orders found.</p>
	{/if}
</section>

<style>
	.order-history-container {
		margin: auto;
	}
</style>
