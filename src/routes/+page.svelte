<script lang="ts">
	import { onMount } from 'svelte';
	import Modal from '$lib/components/Modal.svelte';
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
		let gallery = document.getElementById('combos')!;
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

<div class="border">
	<nav class="bg-white top-0 w-full bg-transparent p-2.5 z-10 shadow-xl h-24">
		<div class="container mx-auto flex justify-between items-center h-full">
			<div class="flex items-center">
				<a href="/"><img alt="logo" src="logo.jpg" class="w-auto h-12" /></a>
				<div class="text-4xl font-bold ml-4" style="color: #e1b42f;">
					<a href="/" style="font-family: Sweaty;">CozyWear</a>
				</div>
			</div>
			<ul class="flex space-x-4">
				<li><a href="/" class="text-black text-sm">Home</a></li>
				<li><a href="/aboutus" class="text-black text-sm">About Us</a></li>
				<li><a href="#" class="text-black text-sm">Services</a></li>
				<li>
					<a href="#" class="contact text-black text-sm" on:click={ToggleModal}>Contact Us</a>
				</li>
				<li><a href="/login" id="Sign" class=" text-sm" style="color: #e1b42f;">Login</a></li>
				<li><a href="/register" id="Sign" class=" text-sm" style="color: #e1b42f;">Register</a></li>
			</ul>
		</div>
	</nav>
</div>

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

<h1 class="text-center text-3xl font-semibol dmt-8" style="color: #e1b42f;">Popular Combos</h1>
<div class="flex justify-center items-cent" id="combos"></div>

<h1 class="text-center text-3xl font-semibold mt-2" id="ser" style="color: #e1b42f;">
	Our Services
</h1>
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

<footer class="bg-gray-800 text-white py-8">
	<div class="container mx-auto px-4">
		<div class="flex ml-44">
			<div class="w-full lg:w-1/3 px-4 mb-4 lg:mb-0">
				<h2 class="text-2xl font-semibold mb-2" style="color: #e1b42f;">CozyWear</h2>
				<ul class="list-none">
					<li><a href="/aboutus" class="hover:text-gray-400">About Us</a></li>
					<li><a href="#" class="hover:text-gray-400" on:click={ToggleModal}>Contact Us</a></li>
					<li><a href="/privacy-policy" class="hover:text-gray-400">Privacy Policy</a></li>
				</ul>
			</div>
			<div class="w-full lg:w-1/3 px-4 mb-4 lg:mb-0">
				<h2 class="text-lg font-semibold mb-4">Support</h2>
				<ul class="list-none">
					<li><a href="/customer/order/" class="hover:text-gray-400">Place an Order</a></li>
					<li><a href="/customer/pricing" class="hover:text-gray-400">Pricing</a></li>
				</ul>
			</div>
			<div class="w-full lg:w-1/3 px-4 mb-4 lg:mb-0">
				<h2 class="text-lg font-semibold mb-4">Follow Us</h2>
				<ul class="list-none">
					<li><a href="#" class="hover:text-gray-400">Facebook</a></li>
					<li><a href="#" class="hover:text-gray-400">Twitter</a></li>
					<li><a href="#" class="hover:text-gray-400">Instagram</a></li>
				</ul>
			</div>
		</div>
	</div>
</footer>

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
