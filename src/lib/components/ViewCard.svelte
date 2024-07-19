<script context="module" lang="ts">
	export type ViewAttribute = {
		name: string;
	};

	type Image = {
		url: string;
		name: string;
	};
</script>

<script lang="ts">
	import { writable } from 'svelte/store';

	export let attributes: ViewAttribute[];
	export let image: Image;
	export let onDelete: () => void; // onDelete function declared as a prop

	let isEditing = writable(false);
	let inputValues: string[] = []; // values take from API

	function toggleEdit() {
		isEditing.update((value) => !value);
	}

	function handleSave() {
		attributes.forEach((attribute, index) => {
			attribute.name = inputValues[index] || ''; // Update attribute name with input value or empty string
		});
		toggleEdit(); // Exit edit mode after saving
	}

	function handleDelete() {
		inputValues = []; // Clear all input values
		attributes.forEach((attribute) => {
			attribute.name = ''; // Clear attribute names
		});
		onDelete();
	}
</script>

<div class="card">
	<img src={image.url} alt={image.name} class="fabric-image" />
	{#each attributes as attribute, index}
		<div class="input-group">
			<label>{attribute.name}:</label>
			{#if $isEditing}
				<input type="text" bind:value={inputValues[index]} />
			{:else}
				<span>{inputValues[index]}</span>
			{/if}
		</div>
	{/each}
	<div class="button-group">
		<button on:click={toggleEdit} class="edit-button">
			{#if $isEditing}
				Save
			{:else}
				Edit
			{/if}
		</button>
		<button on:click={handleDelete} class="delete-button">Delete</button>
	</div>
</div>

<style>
	.card {
		width: 325px;
		max-height: 600px;
		padding: 16px;
		margin: 30px;
		border: 1px solid #ccc;
		border-radius: 12px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
		background-color: #d3d3d3;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
	}

	.fabric-image {
		width: 100%;
		height: 40%;
		border-radius: 12px;
		object-fit: cover;
		margin-bottom: 12px;
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
		font-size: 12px;
	}

	.input-group input,
	.input-group span {
		flex: 1.5;
		font-size: 12px;
		padding: 4px;
		height: 28px;
		border: 1px solid #ccc;
		border-radius: 25px;
		background-color: #f8f9fa;
		box-sizing: border-box;
		width: 100%;
	}

	.button-group {
		display: flex;
		justify-content: space-between;
		margin-top: 10px;
	}

	.edit-button,
	.delete-button {
		flex: 1;
		padding: 8px 10px;
		border: none;
		border-radius: 12px;
		cursor: pointer;
		font-size: 14px;
		margin: 0 5px;
		background-color: #e1b42f;
		color: white;
	}
</style>
