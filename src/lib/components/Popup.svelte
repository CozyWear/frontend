<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let show = false;
	export let imageSrc = '';
	export let material_type = '';
	export let size = '';
	export let name = '';
	export let fit = '';

	const close = () => {
		show = false;
		dispatch('close');
	};
</script>

{#if show}
	<div class="popup" on:click={close}>
		<div class="popup-content" on:click|stopPropagation>
			<div>
				<img class="popup-image" src={imageSrc} alt="Popup Image" />
			</div>
			<div class="popup-data">
				<h2 class="popup-title">Material Type: {material_type}</h2>
				<div class="size">
					<p>Select Size: {size}</p>
					<button> S</button>
					<button> M</button>
					<button> L</button>
				</div>
				<p>Name: {name}</p>
				<p>Fit: {fit}</p>
				<button class="btn">Customize</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.popup {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}
	.popup-content {
		display: flex;
		max-width: 80%;
		margin: auto;
		background-color: white;
		border-radius: 20px;
		overflow: hidden;
	}
	.popup-image {
		flex-basis: 50%;
		max-width: 100%;
		max-height: 80vh;
		padding: 10px;
	}
	.popup-data {
		flex-basis: 50%;
		display: flex;
		flex-direction: column;
		padding: 20px;
		margin-top: 20px;
	}
	.popup-title {
		color: #e1b42f;
		margin-bottom: 10px;
	}
	.btn {
		background-color: #e1b42f;
		width: 100px;
		font-weight: bold;
		color: white;
		margin-top: auto;
		border-radius: 8px;
	}
	.size {
		display: flex;
		flex-direction: row;
	}
</style>
