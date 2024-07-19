<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { onMount } from 'svelte';
	import { img } from '$lib/stores/image';

	let popupImage = '';

	onMount(() => {
		img.subscribe((value) => {
			popupImage = value;
		});
	});
</script>

<NavBar />
<div class="Container">
	<div class="img">
		<img src={popupImage} alt="Selected Image" />
	</div>
</div>
<Footer />

<style>
</style>
