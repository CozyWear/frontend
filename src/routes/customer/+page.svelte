<script lang="ts">
	import { onMount } from 'svelte';
	import { AspectRatio } from '$lib/components/ui/aspect-ratio';

	let imageUrl = '';

	async function fetchImage() {
		const response = await fetch('');
		const data = await response.json();
		imageUrl = data.url;
	}

	fetchImage();
</script>

<div class="w-full">
	<AspectRatio ratio={16 / 9} class="sm:h-96">
		<div class="h-full w-full bg-cover bg-center" style="background-image: url('ps1.jpg');">
			<div class="absolute inset-0 flex items-end justify-center p-4"></div>
		</div>
	</AspectRatio>
</div>
