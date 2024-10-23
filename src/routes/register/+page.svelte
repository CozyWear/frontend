<script lang="ts">
	import { preventDefault } from 'svelte/legacy';

	import { api_url, userTypes } from '$lib/constants';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Alert, AlertDescription } from '$lib/components/ui/alert';
	import { Eye, EyeOff } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

	let usertype = $state(-1);
	let name = $state('');
	let email = $state('');
	let password = $state('');
	let nameInputError = $state('');
	let emailInputError = $state('');
	let passwordInputError = $state('');
	let showPassword = $state(false);

	function validateName() {
		const nameRegex = /^[A-Za-z]+$/;
		nameInputError = !nameRegex.test(name) ? 'Name can only contain letters' : '';
	}

	function validateEmail() {
		const emailRegex = /^[a-zA-Z0-9.]+@(gmail|yahoo|outlook|protonmail|proton)\.com$/;
		emailInputError = !emailRegex.test(email)
			? 'Invalid email address. Please enter a valid email address'
			: '';
	}

	function validatePassword() {
		const passwordRegex = /^(?=.*[!@#$%^&*()+\-_={}[\]:;'"<>,.?/|\\])(?=.*[0-9]).{1,16}$/;
		passwordInputError = !passwordRegex.test(password)
			? 'Max length of 16 characters, with at least 1 number and 1 special character'
			: '';
	}

	async function handleSubmit() {
		const formData = {
			usertype: usertype,
			name,
			email,
			password
		};

		if (!name || !email || !password || nameInputError || emailInputError || passwordInputError) {
			toast.error('All fields are required and need to be valid.');
			return;
		}

		try {
			const response = await fetch(`${api_url}/accounts/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});

			if (response.status === 201) {
				toast.success('Signup successful!');
			} else {
				toast.error('Signup failed: ' + response.statusText);
			}
		} catch (error) {
			toast.error('Error signing up: ' + error);
		}
	}
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
		class="mb-4 mt-10 w-full max-w-md rounded bg-white px-8 pb-8 pt-6 shadow-md"
		onsubmit={preventDefault(handleSubmit)}
	>
		<div class="space-y-2">
			<label for="userType">What are you</label>
			<select bind:value={usertype} class="w-full rounded border border-gray-300 p-2">
				<option value="" disabled selected>User Type</option>
				{#each userTypes as [type, value]}
					<option {value}>{type}</option>
				{/each}
			</select>
		</div>

		<div class="mb-4">
			<Label for="name">Name:</Label>
			<Input type="text" id="name" bind:value={name} on:input={validateName} required />
			{#if nameInputError}
				<Alert variant="destructive" class="mt-2">
					<AlertDescription>{nameInputError}</AlertDescription>
				</Alert>
			{/if}
		</div>

		<div class="mb-4">
			<Label for="email">Email:</Label>
			<Input type="email" id="email" bind:value={email} on:input={validateEmail} required />
			{#if emailInputError}
				<Alert variant="destructive" class="mt-2">
					<AlertDescription>{emailInputError}</AlertDescription>
				</Alert>
			{/if}
		</div>

		<div class="mb-4">
			<Label for="password">Password:</Label>
			<div class="relative">
				<Input
					type={showPassword ? 'text' : 'password'}
					id="password"
					bind:value={password}
					on:input={validatePassword}
					required
				/>
				<button
					type="button"
					class="absolute right-2 top-1/2 -translate-y-1/2"
					onclick={() => (showPassword = !showPassword)}
				>
					{#if !showPassword}
						<EyeOff class="h-5 w-5" />
					{:else}
						<Eye class="h-5 w-5" />
					{/if}
				</button>
			</div>
			{#if passwordInputError}
				<Alert variant="destructive" class="mt-2">
					<AlertDescription>{passwordInputError}</AlertDescription>
				</Alert>
			{/if}
		</div>

		<Button class="w-full" type="submit">Sign Up</Button>
	</form>
</div>
