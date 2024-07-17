<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Popup from '$lib/components/Popup.svelte';

	let showPopup = false;
	let imageSrc = '';

	function handleImageSelected(event) {
		imageSrc = event.detail.src;
		showPopup = false;
	}
</script>

<NavBar />
<div class="Container">
	<div class="img">
		<img src={imageSrc} alt="Selected Image" />
	</div>
</div>
<Footer />

<style>
</style>
