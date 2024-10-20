<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import { AspectRatio } from '$lib/components/ui/aspect-ratio';

	let images = ['t1.jpg', 't2.jpg', 't3.jpg', 't4.jpg'];
	let services = [
		{ img: 'fab.jpg', title: 'Fabric Selection' },
		{ img: 'ds.jpg', title: 'Designer Consultation' },
		{ img: 'exp.jpg', title: 'Express Service' },
		{ img: 'p&d.jpg', title: 'PickUp & Delivery' }
	];

	onMount(() => {
		const gallery = document.getElementById('combos');
		if (gallery) {
			images.forEach((src) => {
				const img = document.createElement('img');
				img.src = src;
				img.className = 'h-auto w-full max-w-[200px] sm:max-w-[220px] md:max-w-[240px] p-2 sm:p-3';
				img.alt = 'Popular Combo';
				gallery.appendChild(img);
			});
		}
	});
</script>

<div class="content">
	<div
		class="flex h-64 w-full items-end justify-center bg-cover bg-center sm:h-96"
		style="background-image: url('ps1.jpg');"
	>
		<Button
			variant="default"
			class="mb-4 rounded-3xl bg-[#e1b42f] font-bold text-white hover:bg-[#c99d28] sm:mb-5"
			on:click={() => (window.location.href = '/customer')}>Customize Your Style</Button
		>
	</div>

	<h1 class="mt-8 text-center text-2xl font-semibold text-[#e1b42f] sm:text-3xl">Popular Combos</h1>
	<p class="px-4 py-4 text-center text-sm font-light sm:px-20 sm:text-base">
		In today's fast-paced world, convenience is key. At CozyWear, our popular combos are designed to
		provide you with stylish and coordinated outfits,<br /> all from the comfort of your home.
	</p>
	<div class="flex flex-wrap justify-center" id="combos"></div>

	<h1 class="mt-8 text-center text-2xl font-semibold text-[#e1b42f] sm:text-3xl" id="ser">
		Our Services
	</h1>
	<p class="px-4 py-4 text-center text-sm font-light sm:px-20 sm:text-base">
		With the rapid advancement of technology, it's essential to establish an online presence. At
		CozyWear, we offer convenient tailoring services <br /> that you can enjoy from the comfort of your
		home.
	</p>
	<div class="flex flex-wrap justify-center">
		{#each services as service}
			<div class="p-2 text-center sm:p-3">
				<img
					src={service.img}
					alt={service.title}
					class="h-auto w-full max-w-[200px] rounded-lg sm:max-w-[220px] md:max-w-[240px]"
				/>
				<p class="mt-2 text-sm font-semibold text-[#e1b42f] sm:text-base">{service.title}</p>
			</div>
		{/each}
	</div>
</div>
