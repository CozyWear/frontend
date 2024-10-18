<script lang="ts">
	import { userType } from '../../routes/store';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let isLoggedIn = false;

	const ToggleModal = () => {
		showModal = !showModal;
	};
	let showModal = false;
</script>

<nav class="top-0 z-10 h-24 w-full bg-transparent bg-white p-2.5 shadow-xl">
	<div class="container mx-auto flex h-full items-center justify-between">
		<div class="flex items-center">
			<a href="/"><img alt="logo" src="/logo.jpg" class="h-12 w-auto" /></a>
			<div class="ml-4 text-4xl font-bold" style="color: #e1b42f;">
				<a href="/" style="font-family: Sweaty;">CozyWear</a>
			</div>
		</div>
		<input
			type="text"
			placeholder="  Search..."
			style="border-radius: 30px; border:1px solid black; width:500px; height:40px"
		/>
		<ul class="flex space-x-4">
			<li><a href="/" class="text-sm text-black">Home</a></li>
			<li><a href="/aboutus" class="text-sm text-black">About Us</a></li>
			<li><a href="cozywear.pages.dev.#ser" class="text-sm text-black">Services</a></li>
			<li>
				<a href="/contactus" class="contact text-sm text-black" on:click={ToggleModal}>Contact Us</a
				>
			</li>
			<li>
				<a
					href="/login"
					id="Sign"
					class={$userType != -1 ? 'hidden' : 'text-sm'}
					style="color: #e1b42f">Login</a
				>
			</li>
			<li>
				<a
					href="/register"
					id="Sign"
					class={$userType != -1 ? 'hidden' : 'text-sm'}
					style="color: #e1b42f">Register</a
				>
			</li>
			<li>
				<a
					href="/logout"
					id="Sign"
					class={$userType != -1 ? 'text-sm' : 'hidden'}
					style="color: #e1b42f">Logout</a
				>
			</li>
		</ul>
	</div>
</nav>
