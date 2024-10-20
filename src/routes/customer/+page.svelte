<script lang="ts">
	import { onMount } from 'svelte';
	import Popup from '$lib/components/Popup.svelte';
</script>

<div
	class="flex h-64 w-full items-end justify-center bg-cover bg-center sm:h-96"
	style="background-image: url('ps1.jpg');"
>
	<div class="absolute inset-0 flex items-end justify-center p-4">
		<!-- Content can be added here if needed -->
	</div>
</div>

<style>
	@media (max-width: 640px) {
		div {
			height: 100vh;
		}
	}
</style>
