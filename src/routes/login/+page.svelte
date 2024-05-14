<script lang="ts">
	import { api_url } from '$lib/constants';
	import { customer_id, tailor_id, merchant_id } from '$lib/constants';

	let email: string;
	let password: string;
	let usertype: string;

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
</script>

<svelte:head>
	<title>Register</title>
	<meta
		name="description"
		content="Login to CozyWear for access to your account. Enjoy personalized shopping experiences and manage your orders seamlessly. Sign in now!"
	/>
</svelte:head>

<div class="bg-[#d7ab99] flex justify-center items-center h-screen">
	<form
		class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3"
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
			<input
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				id="password"
				type="password"
				bind:value={password}
				required
			/>
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
