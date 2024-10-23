<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import Footer from '$lib/components/Footer.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import '../app.css';

	import { getCookie } from '$lib/helpers';
	import { userTypeRoutes } from '$lib/constants';
	import { Toaster } from 'svelte-sonner';

	let { children } = $props();

	onMount(() => {
		const userType = Number(getCookie('userType'));

		if (userTypeRoutes.has(userType)) {
			const allowedPath = userTypeRoutes.get(userType)!;

			if (!window.location.pathname.startsWith(allowedPath)) {
				goto(allowedPath);
			}
		} else {
			goto('/login');
		}
	});
</script>

<NavBar />
{@render children?.()}
<Toaster />
<Footer />
