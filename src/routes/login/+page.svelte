<script lang="ts">
	import { goto } from '$app/navigation';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { api_url, customer_id, tailor_id, merchant_id } from '$lib/constants';
	import { Eye, EyeOff } from 'lucide-svelte';
	import { userType } from '../store';

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
		<div class="mb-4">
			<Label for="password">Password:</Label>
			<div class="relative">
				<Input
					type={showPassword ? 'text' : 'password'}
					id="password"
					bind:value={password}
					required
				/>
				<button
					type="button"
					class="absolute right-2 top-1/2 -translate-y-1/2"
					on:click={() => (showPassword = !showPassword)}
				>
					{#if !showPassword}
						<EyeOff class="h-5 w-5" />
					{:else}
						<Eye class="h-5 w-5" />
					{/if}
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
