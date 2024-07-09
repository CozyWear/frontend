<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function addItem() {
		dispatch('add');
	}

	function removeItem() {
		dispatch('remove');
	}

	function viewItem() {
		dispatch('view');
	}

	let activeOption = 'view'; // Set 'view' as the default active option

	function setActive(option) {
		activeOption = option;
	}
</script>

<div class="sidebar-container">
	<div class="sidebar">
		<div
			class="sidebar-item"
			class:selected={activeOption === 'add'}
			on:click={() => {
				setActive('add');
				addItem();
			}}
		>
			Add Item
		</div>
		<div
			class="sidebar-item"
			class:selected={activeOption === 'view'}
			on:click={() => {
				setActive('view');
				viewItem();
			}}
		>
			View Item
		</div>
		<div
			class="sidebar-item"
			class:selected={activeOption === 'remove'}
			on:click={() => {
				setActive('remove');
				removeItem();
			}}
		>
			Remove Item
		</div>
	</div>
</div>

<style>
	.sidebar-container {
		position: relative;
		width: 250px;
		background-color: #292827;
		color: #fff;
		padding: 16px;
		z-index: 900;
		height: calc(100vh - 100px);
		overflow-y: auto;
	}

	.sidebar {
		width: 200px;
		display: flex;
		flex-direction: column;
	}

	.sidebar-item {
		padding: 10px;
		margin: 10px;
		cursor: pointer;
		text-align: center;
		border-radius: 4px;
		transition:
			background-color 0.3s ease,
			box-shadow 0.3s ease;
	}

	.sidebar-item:hover {
		background-color: #444;
	}

	.sidebar-item.active,
	.sidebar-item.selected {
		background-color: #444;
		box-shadow: 0 0 0 1px #f5f8f6;
	}
</style>
