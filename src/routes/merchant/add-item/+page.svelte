<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import type { ViewAttribute } from '$lib/components/ViewCard.svelte';

	const attributes: ViewAttribute[] = [
		{ name: 'Material Name' },
		{ name: 'Material Type' },
		{ name: 'Size' },
		{ name: 'Cost Per Unit' },
		{ name: 'Stock Quantity' }
	];

	function addImage() {
		alert('Add image...');
	}

	function saveItem() {
		alert('Item saved!!!'); // delete this

		// API call to save item to be implement

		let inputGroups = document.querySelectorAll('.input-group');
		for (let inputGroup of inputGroups) {
			let input = inputGroup.querySelector('input');
			input.value = '';
		}
	}
</script>

<div class="page-container">
	<NavBar />

	<div class="content-wrapper">
		<div class="main-content">
			<div class="image-box">
				<a id="add-button" onclick={addImage}>+</a>
			</div>
			<div class="item-details">
				{#each attributes as attribute, index}
					<div class="input-group">
						<label>{attribute.name}:</label>
						<input type="text" />
						<!-- <span></span> -->
					</div>
				{/each}
				<button onclick={saveItem} class="save-button">Save item</button>
			</div>
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
		margin: 55px 0 0 60px;
	}

	.image-box {
		width: 300px;
		height: 450px;
		border-radius: 20px;
		border: 0.5px solid #000000;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.item-details {
		padding: 25px 0 0 40px;
		display: flex;
		flex-direction: column;
		gap: 15px;
	}

	.input-group {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
	}

	.input-group label {
		flex: 1;
		margin-right: 5px;
		font-weight: bold;
		font-size: 16px;
		color: #e1b42f;
	}

	.input-group input,
	.input-group span {
		flex: 1.5;
		/* font-size: 12px; */
		padding: 4px;
		height: 28px;
		border: 1px solid #000;
		border-radius: 25px;
		background-color: #f8f9fa;
		box-sizing: border-box;
		width: 100%;
		/* box-shadow: 0px 4px 4px 0px #00000040 inset; */
	}

	#add-button {
		width: 73px;
		height: 72px;
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

	.save-button {
		/* flex: 1; */
		padding: 8px 10px;
		border: none;
		border-radius: 12px;
		cursor: pointer;
		font-size: 14px;
		margin: 10px 0 5px 0;
		background-color: #e1b42f;
		color: white;
	}
	.save-button:hover {
		box-shadow: 2px 4px 4px 2px rgba(0, 0, 0, 0.25);
	}
</style>
