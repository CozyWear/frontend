<script lang="ts">
	import { goto } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let show = false;
	export let imageSrc = '';
	export let Design = '';
	export let name = '';
	export let fit = '';

	function navigation() {
		goto('/customize');
	}
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
				<h2 class="popup-title">Design: {Design}</h2>
				<p>Name: {name}</p>
				<p>Fit Type: {fit}</p>
				<button id="btn" on:click={navigation}>Customize</button>
			</div>
		</div>
	</div>
{/if}

<style>
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes slideIn {
		from {
			transform: translateY(50px);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	.popup {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.6);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
		animation: fadeIn 0.3s ease-in-out;
	}

	.popup-content {
		display: flex;
		flex-direction: row;
		max-width: 80%;
		margin: auto;
		background-color: white;
		border-radius: 20px;
		overflow: hidden;
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
		animation: slideIn 0.3s ease-in-out;
	}

	.popup-image {
		max-width: 100%;
		max-height: 90vh;
	}

	.popup-data {
		margin-top: 20px;
		margin-left: 10px;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
	}

	.popup-title {
		color: #e1b42f;
		margin-bottom: 10px;
		font-size: 1.5rem;
	}

	.popup-data p {
		margin: 10px 0px 10px 0px;
	}

	#btn {
		background-color: #e1b42f;
		width: 150px;
		font-weight: bold;
		color: white;
		border: none;
		padding: 10px;
		border-radius: 8px;
		cursor: pointer;
		transition: background-color 0.3s ease;
		margin-top: 170px;
	}

	#btn:hover {
		background-color: #d0a11f;
	}
</style>
