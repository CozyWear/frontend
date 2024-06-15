<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let show = false;
	export let imageSrc = '';
	export let title = '';
	export let description = '';

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
				<h2 class="popup-title">{title}</h2>
				<p>{description}</p>
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
		justify-content: center;
		padding: 20px;
	}
	.popup-title {
		color: #e1b42f;
		margin-bottom: 10px;
	}
</style>
