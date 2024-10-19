<script lang="ts">
	import { api_url } from '$lib/constants';
	import { customer_id, tailor_id, merchant_id } from '$lib/constants';
	import { onMount } from 'svelte';

	let usertype: string,
		name: string,
		email: string,
		password: string,
		nameInputError: string,
		phoneInputError: string,
		emailInputError: string,
		passwordInputError: string;
	let showPassword: boolean = false;

	function validateName() {
		const nameRegex = /^[A-Za-z]+$/;

		if (!nameRegex.test(name)) {
			nameInputError = 'First name can only contain letters.';
		} else {
			nameInputError = '';
		}
	}

	function validateEmail() {
		const gmailRegex = /^[a-zA-Z0-9.]+@gmail\.com$/;
		const yahooRegex = /^[a-zA-Z0-9.]+@yahoo\.com$/;
		const outlookRegex = /^[a-zA-Z0-9.]+@outlook\.com$/;
		const protonmailRegex = /^[a-zA-Z0-9.]+@protonmail\.com$/;
		const protonmeRegex = /^[a-zA-Z0-9.]+@proton\.me$/;

		if (
			!gmailRegex.test(email) &&
			!yahooRegex.test(email) &&
			!outlookRegex.test(email) &&
			!protonmailRegex.test(email) &&
			!protonmeRegex.test(email)
		) {
			emailInputError = 'Invalid email address. Please enter a valid email address';
		} else {
			emailInputError = '';
		}
	}

	function validatePassword() {
		const passwordRegex = /^(?=.*[!@#$%^&*()+\-_={}[\]:;'"<>,.?/|\\])(?=.*[0-9]).{1,16}$/;

		if (!passwordRegex.test(password)) {
			passwordInputError =
				'Max length of 16 characters, with at least 1 number and 1 special character';
		} else {
			passwordInputError = '';
		}
	}

	async function handleSubmit() {
		const formData = {
			usertype: parseInt(usertype),
			name,
			email,
			password
		};

		if (!validateFormData(formData)) {
			return;
		}

		try {
			const response = await fetch(`${api_url}/accounts/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json' // Corrected semicolon
				},
				body: JSON.stringify(formData)
			});

			if (response.status === 201) {
				console.log('Signup successful!', response.body); // Log success and the response
			} else {
				console.error('Signup failed:', response.statusText);
			}
		} catch (error) {
			console.error('Error signing up:', error);
		}
	}

	function validateFormData(formData: any) {
		if (!formData.name || !formData.email || !formData.password) {
			alert('All fields are required and need to be valid.');
			return false;
		}

		return true;
	}
	function togglePasswordVisibility() {
		showPassword = !showPassword;
	}

	onMount(() => {
		togglePasswordVisibility();
	});
</script>

<svelte:head>
	<title>Register</title>
	<meta
		name="description"
		content="Register with CozyWear for cozy, stylish clothing and accessories. Sign up today for exclusive updates on our latest collections."
	/>
</svelte:head>

<div class="flex flex-col items-center justify-center bg-[#fcefb4] py-10">
	<header class="py-4">
		<h1 class="text-center text-3xl font-bold">Register</h1>
	</header>
	<form
		class="mb-4 mt-10 w-1/3 rounded bg-white px-8 pb-8 pt-6 shadow-md"
		on:submit|preventDefault={handleSubmit}
	>
		<label class="mb-2 block text-sm font-bold text-gray-700" for="usertype">What are you:</label>
		<select
			class="focus:shadow-outline mb-4 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
			id="usertype"
			bind:value={usertype}
		>
			<option value={customer_id}>A Customer</option>
			<option value={tailor_id}>A Tailor</option>
			<option value={merchant_id}>A Merchant</option>
		</select>

		<label class="mb-2 block text-sm font-bold text-gray-700" for="firstname">Name:</label>
		<input
			class="focus:shadow-outline mb-4 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
			type="text"
			id="firstname"
			bind:value={name}
			required
		/>
		{#if nameInputError}
			<p class="text-xs italic text-red-500">{nameInputError}</p>
		{/if}

		<label class="mb-2 block text-sm font-bold text-gray-700" for="email">Email:</label>
		<input
			class="focus:shadow-outline mb-4 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
			type="email"
			id="email"
			bind:value={email}
			on:input={validateEmail}
			required
		/>
		{#if emailInputError}
			<p class="text-xs italic text-red-500">{emailInputError}</p>
		{/if}

		<label class="mb-2 block text-sm font-bold text-gray-700" for="password">Password:</label>
		<div class="relative">
			{#if showPassword}
				<input
					class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 pr-10 leading-tight text-gray-700 shadow focus:outline-none"
					id="password"
					type="password"
					bind:value={password}
					on:input={validatePassword}
					required
				/>
			{:else}
				<input
					class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 pr-10 leading-tight text-gray-700 shadow focus:outline-none"
					id="password"
					type="text"
					bind:value={password}
					on:input={validatePassword}
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
		{#if passwordInputError}
			<p class="text-xs italic text-red-500">{passwordInputError}</p>
		{/if}

		<button
			class="focus:shadow-outline w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
			style="margin-top: 20px;"
			type="submit">Sign Up</button
		>
	</form>
</div>
