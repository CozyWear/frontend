<script lang="ts">
	import { goto } from '$app/navigation';
	import { api_url, customer_id, tailor_id, merchant_id } from '$lib/constants';
	import { userType } from '../store';
	import { onMount } from 'svelte';

	let email: string;
	let password: string;
	let usertype: string;
	let showPassword = false;
	let error = '';

	async function handleSubmit() {
		error = '';
		const formData = {
			email,
			password,
			usertype: parseInt(usertype)
		};

		try {
			const response = await fetch(`${api_url}/accounts/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData)
			});

			if (response.ok) {
				userType.set(parseInt(usertype));
				switch (parseInt(usertype)) {
					case 0:
						goto('/customer');
						break;
					case 1:
						goto('/tailor');
						break;
					case 2:
						goto('/merchant');
						break;
					default:
						throw new Error('Invalid user type');
				}
			} else {
				throw new Error('Invalid Email/Password');
			}
		} catch (err) {
			if (err instanceof Error) {
				error = err.message;
			} else {
				error = 'An unexpected error occurred';
			}
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

<div class="flex min-h-screen flex-col items-center justify-center bg-[#fcefb4] p-4">
	<h1 class="mb-6 text-3xl font-bold">Login</h1>
	<form
		class="w-full max-w-md rounded-lg bg-white p-6 shadow-md"
		on:submit|preventDefault={handleSubmit}
	>
		{#if error}
			<div
				class="relative mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
				role="alert"
			>
				<span class="block sm:inline">{error}</span>
			</div>
		{/if}
		<div class="mb-4">
			<label class="mb-2 block text-sm font-bold text-gray-700" for="email">Email</label>
			<input
				class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
				id="email"
				type="email"
				bind:value={email}
				required
			/>
		</div>
		<div class="mb-6">
			<label class="mb-2 block text-sm font-bold text-gray-700" for="password">Password</label>
			<div class="relative">
				{#if showPassword}
					<input
						class="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
						id="password"
						type="text"
						bind:value={password}
						required
					/>
				{:else}
					<input
						class="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
						id="password"
						type="password"
						bind:value={password}
						required
					/>
				{/if}

				<button
					type="button"
					class="absolute inset-y-0 right-0 flex items-center pr-3"
					on:click={togglePasswordVisibility}
				>
					<svg class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						{#if showPassword}
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
							/>
						{:else}
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
							/>
						{/if}
					</svg>
				</button>
			</div>
		</div>
		<div class="mb-6">
			<label class="mb-2 block text-sm font-bold text-gray-700" for="userType">What are you</label>
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
		<div class="flex items-center justify-between">
			<button
				class="focus:shadow-outline w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
				type="submit">Login</button
			>
		</div>
	</form>
</div>
