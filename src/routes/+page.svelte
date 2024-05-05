<script lang="ts">
	import { goto } from '$app/navigation';

	function gotoMerchant() {
		goto('/merchant/');
	}

	function gotoTailor() {
		goto('/tailor/');
	}
</script>

<svelte:head>
	<title>choosing</title>
</svelte:head>

<article>
	<header>
		<p>Who are you?</p>
	</header>
	<main>
		<button on:click={gotoMerchant} class="contrast">Merchant</button>
		<button on:click={gotoTailor} class="contrast">Tailor</button>
	</main>
</article>

<style>
	p {
		font-size: 3rem;
		text-align: center;
	}

	button {
		font-size: 5rem;
		text-align: center;
		font-family: Arial, Helvetica, sans-serif;
		width: 80%;
		margin: 0% 10% 10% 5%;
	}
</style>
