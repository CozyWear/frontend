<script lang="ts">
	import { goto } from '$app/navigation';
	import { api_url } from '$lib/constants';
	import { customer_id, tailor_id, merchant_id } from '$lib/constants';
	import { onMount } from 'svelte';
	import { userType } from '../store';
	import NavBar from '$lib/components/NavBar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let email: string;
	let password: string;
	let usertype: string;
	let showPassword: boolean = false;

	let showModal = false;
	const ToggleModal = () => {
		showModal = !showModal;
	};

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
				console.log(response.json());
				switch (parseInt(usertype)) {
					case 0:
						goto('/customer').then();
						userType.set(0);
						break;
					case 1:
						goto('/tailor').then();
						userType.set(1);
						break;
					case 2:
						goto('/merchant').then();
						userType.set(2);
						break;
					default:
						console.log('Invalid user type');
				}
				userType.subscribe((value) => {
					console.log(value);
				});
			} else {
				console.log('Invalid Email/Password');
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
</script>

<svelte:head>
	<title>Login</title>
	<meta
		name="description"
		content="Login to CozyWear for access to your account. Enjoy personalized shopping experiences and manage your orders seamlessly. Sign in now!"
	/>
</svelte:head>

<div class="border">
	<NavBar />
</div>

<div class="flex flex-col items-center justify-between bg-[#fcefb4] py-10">
	<header class="py-4">
		<h1 class="text-center text-3xl font-bold">Login</h1>
	</header>
	<form
		class="mb-4 mt-10 w-1/3 rounded bg-white px-8 pb-8 pt-6 shadow-md"
		on:submit|preventDefault={handleSubmit}
	>
		<div class="mb-4">
			<label class="mb-2 block text-sm font-bold text-gray-700" for="email">Email:</label>
			<input
				class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
				id="email"
				type="email"
				bind:value={email}
				required
			/>
		</div>
		<div class="mb-4">
			<label class="mb-2 block text-sm font-bold text-gray-700" for="password">Password:</label>
			<div class="relative">
				{#if showPassword}
					<input
						class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 pr-10 leading-tight text-gray-700 shadow focus:outline-none"
						id="password"
						type="password"
						bind:value={password}
						required
					/>
				{:else}
					<input
						class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 pr-10 leading-tight text-gray-700 shadow focus:outline-none"
						id="password"
						type="text"
						bind:value={password}
						required
					/>
				{/if}
				<div class="absolute right-2 top-1.5">
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
			<label class="mb-2 block text-sm font-bold text-gray-700" for="userType">What are you:</label>
			<select
				class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
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
				class="focus:shadow-outline w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
				type="submit">Login</button
			>
		</div>
	</form>
</div>

<Footer />
