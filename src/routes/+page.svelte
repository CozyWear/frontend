<script lang="ts">
	import { onMount } from 'svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import NavBar from '$lib/components/NavBar.svelte';

	let name = '';
	let email = '';
	let nameError = '';
	let emailError = '';

	let showModal = false;
	const ToggleModal = () => {
		showModal = !showModal;
	};

	const validateForm = () => {
		let isValid = true;

		if (name.trim() === '') {
			nameError = 'Name is required';
			isValid = false;
		} else {
			nameError = '';
		}

		if (email.trim() === '') {
			emailError = 'Email is required';
			isValid = false;
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			emailError = 'Invalid email address';
			isValid = false;
		} else {
			emailError = '';
		}

		return isValid;
	};

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

<Modal {showModal} on:click={ToggleModal}>
	<h3 style="color: #e1b42f;">Contact Us</h3>
	<form on:submit|preventDefault={validateForm}>
		<input type="text" placeholder="Name" class="inputs" bind:value={name} />
		<br />
		<span id="nameError" style="color: red;">{nameError}</span>
		<input type="text" placeholder="Email" class="inputs" bind:value={email} />
		<br />
		<span id="emailError" style="color: red;">{emailError}</span>
		<select
			style="width: 80%; margin:5% auto; border:1px solid ; padding:12px 8px; border-radius:10px; background-color: #fefefe;"
		>
			<option value="Customer">Customer</option>
			<option value="Merchant">Merchant</option>
			<option value="Tailor">Tailor</option>
		</select>
		<br />
		<textarea name="Feedback" style="width: 80%; margin:5%;" placeholder="Enter Your Feedback Here"
		></textarea>
		<br />
		<button style="background-color: #e1b42f; color: white; border-radius: 10px">Submit</button>
	</form>
</Modal>

<NavBar />
<div class="flex justify-around items-center text-white mt-1">
	<div class="text-center">
		<a href="/category/men/">
			<img src="men.jpg" alt="Men" class="w-16 h-16 mt-0.5 rounded-full" />
		</a>
		<p class="font-semibold text-sm" style="color: #e1b42f;">Men</p>
	</div>
	<div class="text-center">
		<a href="/category/kids/">
			<img src="kid.jpg" alt="Kids" class="w-16 h-16 mt-0.5 rounded-full" />
		</a>
		<p class="font-semiboldtext-sm" style="color: #e1b42f;">Kids</p>
	</div>
	<div class="text-center">
		<a href="/category/women/">
			<img src="woman.jpg" alt="Women" class="w-16 h-16 mt-0.5 rounded-full" />
		</a>
		<p class="font-semibold text-sm" style="color: #e1b42f;">Women</p>
	</div>
</div>

<div
	class="bg-cover bg-center h-96 mt-1 w-full flex items-end justify-center"
	style="background-image: url('ps1.jpg');"
>
	<button style="background-color: #e1b42f; margin-bottom: 20px;" class="rounded-3xl text-white"
		>Customize Your Style</button
	>
</div>

<h1 class="text-center text-3xl font-semibold dmt-8" style="color: #e1b42f;padding-top:15px">
	Popular Combos
</h1>
<p style="text-align: center; font-weight:250; padding: 15px 20px; font-size:16px;">
	In today's fast-paced world, convenience is key. At CozyWear, our popular combos are designed to <br
	/>
	provide you with stylish and coordinated outfits, all from the comfort of your home. <br />
</p>
<div class="flex justify-center items-cent" id="combos" style="padding: 15px 15px;"></div>

<h1 class="text-center text-3xl font-semibold mt-2" id="ser" style="color: #e1b42f;">
	Our Services
</h1>
<p style="text-align: center; font-weight:250; padding: 15px 20px; font-size:16px;">
	With the rapid advancement of technology, it's essential to establish an online presence.<br />
	At CozyWear, we offer convenient tailoring services that <br />
	you can enjoy from the comfort of your home.
</p>
<div class="flex justify-center items-cent mt-4 mb-4">
	<div class="text-center">
		<img src="fab.jpg" alt="Fabric Selection" class="h-auto w-60 pt-3.5 pl-5 m-2.5" />
		<p class="mt-2 font-semibold" style="color: #e1b42f;">Fabric Selection</p>
	</div>
	<div class="text-center">
		<img src="ds.jpg" alt="Designer Consultation" class="h-auto w-60 pt-3.5 pl-5 m-2.5" />
		<p class="mt-2 font-semibold" style="color: #e1b42f;">Designer Consultation</p>
	</div>
	<div class="text-center">
		<img src="exp.jpg" alt="Express Service" class="h-auto w-60 pt-3.5 pl-5 m-2.5" />
		<p class="mt-2 font-semibold" style="color: #e1b42f;">Express Service</p>
	</div>
	<div class="text-center">
		<img src="p&d.jpg" alt="PickUp & Delhivery" class="h-auto w-60 pt-3.5 pl-5 m-2.5" />
		<p class="mt-2 font-semibold" style="color: #e1b42f;">PickUp & Delhivery</p>
	</div>
</div>
<Footer />

<style>
	.inputs {
		background-color: #fefefe;
		margin: 5% auto;
		padding: 10px;
		border: 1px solid #888;
		width: 80%;
		border-radius: 10px;
	}
	button {
		border: 0;
		cursor: pointer;
		padding: 8px 12px;
		font-weight: bold;
		box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
	}
	h3 {
		font-size: 24px;
	}
</style>
