<script lang="ts">
	import { api_url } from '$lib/constants';
	import { customer_id, tailor_id, merchant_id } from '$lib/constants';
	import { onMount } from 'svelte';

	let email: string;
	let password: string;
	let usertype: string;
	let showPassword: boolean = false;

	async function handleSubmit() {
		const formData = {
			email,
			password,
			usertype: parseInt(usertype)
		};

		try {
			const response = await fetch(`${api_url}/accounts/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});

			if (response.ok) {
				console.log('Login Successful');
			} else {
				console.log('Invalid Email/Password/User Type');
				console.log(response);
			}
		} catch (error) {
			console.error('Error logging in:', error);
		}
	}

	function togglePasswordVisibility() {
		showPassword = !showPassword;
	}

	onMount(() => {
		togglePasswordVisibility();
	});

	let showModal = false;
	const ToggleModal = () => {
		showModal = !showModal;
	};
</script>

<svelte:head>
	<title>Login</title>
	<meta
		name="description"
		content="Login to CozyWear for access to your account. Enjoy personalized shopping experiences and manage your orders seamlessly. Sign in now!"
	/>
</svelte:head>

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
				<li>
					<a href="/register" id="Sign" class=" text-sm" style="color: #e1b42f;">Register</a>
				</li>
			</ul>
		</div>
	</nav>
</div>

<div class="bg-[#fcefb4] flex flex-col justify-between items-center py-10">
	<header class="py-4">
		<h1 class="text-3xl font-bold text-center">Login</h1>
	</header>
	<form
		class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3 mt-10"
		on:submit|preventDefault={handleSubmit}
	>
		<div class="mb-4">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email:</label>
			<input
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				id="email"
				type="email"
				bind:value={email}
				required
			/>
		</div>
		<div class="mb-4">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password:</label>
			<div class="relative">
				{#if showPassword}
					<input
						class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
						id="password"
						type="password"
						bind:value={password}
						required
					/>
				{:else}
					<input
						class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
						id="password"
						type="text"
						bind:value={password}
						required
					/>
				{/if}
				<div class="absolute top-1.5 right-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						stroke-width="1.5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						on:click={togglePasswordVisibility}
						aria-label="Toggle password visibility"
					>
						{#if showPassword}
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
							/>
						{:else}
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
							/>
						{/if}
					</svg>
				</div>
			</div>
		</div>
		<div class="mb-6">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="userType">What are you:</label>
			<select
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				id="userType"
				bind:value={usertype}
			>
				<option value={customer_id}>A Customer</option>
				<option value={tailor_id}>A Tailor</option>
				<option value={merchant_id}>A Merchant</option>
			</select>
		</div>
		<div class="mb-4">
			<button
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
				type="submit">Login</button
			>
		</div>
	</form>
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
	<p class="text-white-600 text-sm flex justify-center">
		&copy; 2024 CozyWear. All rights reserved.
	</p>
</footer>
