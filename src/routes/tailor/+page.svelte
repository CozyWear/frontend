<script lang="ts">
	import { goto } from '$app/navigation';

	function gotoLogin() {
		goto('tailor/login');
	}

	function gotoRegister() {
		goto('tailor/register');
	}
</script>

<svelte:head>
	<title>Merchant</title>
</svelte:head>

<article>
	<header>
		<p>do you wanna register or login</p>
	</header>
	<main>
		<button on:click={gotoLogin} class="contrast">Login</button>
		<button on:click={gotoRegister} class="contrast">Register</button>
	</main>
</article>

<style>
	p {
		font-size: 3rem;
		text-align: center;
	}
</style>
