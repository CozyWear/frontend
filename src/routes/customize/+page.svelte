<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { onMount } from 'svelte';
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
