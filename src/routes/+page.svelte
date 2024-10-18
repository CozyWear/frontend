<script lang="ts">
	import { onMount } from 'svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import NavBar from '$lib/components/NavBar.svelte';

	onMount(() => {
		let images = ['t1.jpg', 't2.jpg', 't3.jpg', 't4.jpg'];
		let gallery = document.getElementById('combos');
		for (var i = 0; i < images.length; i++) {
			var img = document.createElement('img');
			img.src = images[i];
			img.className = 'h-auto w-56 pt-3.5 pl-5';
			gallery.appendChild(img);
		}
	});
</script>

<NavBar />
<div class="content">
	<div
		class="flex h-96 w-full items-end justify-center bg-cover bg-center"
		style="background-image: url('ps1.jpg');"
	>
		<button style="background-color: #e1b42f; margin-bottom: 20px;" class="rounded-3xl text-white"
			>Customize Your Style</button
		>
	</div>

	<h1 class="dmt-8 text-center text-3xl font-semibold" style="color: #e1b42f;padding-top:15px">
		Popular Combos
	</h1>
	<p style="text-align: center; font-weight:250; padding: 15px 20px; font-size:16px;">
		In today's fast-paced world, convenience is key. At CozyWear, our popular combos are designed to <br
		/>
		provide you with stylish and coordinated outfits, all from the comfort of your home. <br />
	</p>
	<div class="items-cent flex justify-center" id="combos" style="padding: 15px 15px;"></div>

	<h1 class="mt-2 text-center text-3xl font-semibold" id="ser" style="color: #e1b42f;">
		Our Services
	</h1>
	<p style="text-align: center; font-weight:250; padding: 15px 20px; font-size:16px;">
		With the rapid advancement of technology, it's essential to establish an online presence.<br />
		At CozyWear, we offer convenient tailoring services that <br />
		you can enjoy from the comfort of your home.
	</p>
	<div class="items-cent mb-4 mt-4 flex justify-center">
		<div class="text-center">
			<img src="fab.jpg" alt="Fabric Selection" class="m-2.5 h-auto w-60 pl-5 pt-3.5" />
			<p class="mt-2 font-semibold" style="color: #e1b42f;">Fabric Selection</p>
		</div>
		<div class="text-center">
			<img src="ds.jpg" alt="Designer Consultation" class="m-2.5 h-auto w-60 pl-5 pt-3.5" />
			<p class="mt-2 font-semibold" style="color: #e1b42f;">Designer Consultation</p>
		</div>
		<div class="text-center">
			<img src="exp.jpg" alt="Express Service" class="m-2.5 h-auto w-60 pl-5 pt-3.5" />
			<p class="mt-2 font-semibold" style="color: #e1b42f;">Express Service</p>
		</div>
		<div class="text-center">
			<img src="p&d.jpg" alt="PickUp & Delhivery" class="m-2.5 h-auto w-60 pl-5 pt-3.5" />
			<p class="mt-2 font-semibold" style="color: #e1b42f;">PickUp & Delivery</p>
		</div>
	</div>
</div>
<Footer />

<style>
	button {
		border: 0;
		cursor: pointer;
		padding: 8px 12px;
		font-weight: bold;
		box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
	}
</style>
