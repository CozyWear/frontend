<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	const ToggleModal = () => {
		showModal = !showModal;
	};
	let showModal = false;
</script>

<nav class="bg-white top-0 w-full bg-transparent p-2.5 z-10 shadow-xl h-24">
	<div class="container mx-auto flex justify-between items-center h-full">
		<div class="flex items-center">
			<a href="/"><img alt="logo" src="/logo.jpg" class="w-auto h-12" /></a>
			<div class="text-4xl font-bold ml-4" style="color: #e1b42f;">
				<a href="/" style="font-family: Sweaty;">CozyWear</a>
			</div>
		</div>
		<ul class="flex space-x-4">
			<li><a href="/" class="text-black text-sm">Home</a></li>
			<li><a href="/aboutus" class="text-black text-sm">About Us</a></li>
			<li><a href="cozywear.pages.dev.#ser" class="text-black text-sm">Services</a></li>
			<li>
				<a href="/contactus" class="contact text-black text-sm" on:click={ToggleModal}>Contact Us</a
				>
			</li>
			<li><a href="/login" id="Sign" class=" text-sm" style="color: #e1b42f;">Login</a></li>
			<li><a href="/register" id="Sign" class=" text-sm" style="color: #e1b42f;">Register</a></li>
		</ul>
	</div>
</nav>
