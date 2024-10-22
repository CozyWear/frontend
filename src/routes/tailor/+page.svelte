<script lang="ts">
	import type { ViewAttribute } from '$lib/components/ViewCard.svelte';

	const attributes: ViewAttribute[] = [
		{ name: 'Style Name' },
		{ name: 'Size' },
		{ name: 'Style Type' },
		{ name: 'Material Type' },
		{ name: 'Fit Type' },
		{ name: 'Cost Per Unit' }
	];

	let cards = [{}, {}, {}];
</script>

<div class="page-container">
	<div class="content-wrapper">
		<div class="main-content">
			<a id="add-button" href="/tailor/add-item">+</a>
			{#each cards as card}
				{@const image = { url: 'fabric.jpg', name: '' }}
			{/each}
		</div>
	</div>
</div>

<style>
	.page-container {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.content-wrapper {
		display: flex;
		flex: 1;
		overflow-x: hidden;
	}

	.main-content {
		flex: 1;
		display: inline-flex;
		flex-wrap: wrap;
		padding: 5px;
	}

	#add-button {
		width: 73px;
		height: 72px;
		margin: 80px 30px 0 60px;
		position: fixed;
		bottom: 30px;
		right: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 10px;
		background: #e1b42f;
		font-size: 50px;
		padding: auto;
		color: white;
		cursor: pointer;
	}

	#add-button:hover {
		box-shadow: 2px 4px 4px 2px rgba(0, 0, 0, 0.25);
	}
</style>
