<script lang="ts">
	import { api_url } from '$lib/constants';
	import { customer_id, tailor_id, merchant_id } from '$lib/constants';
	import { onMount } from 'svelte';
	import Footer from '$lib/components/Footer.svelte';
	import NavBar from '$lib/components/NavBar.svelte';

	let showModal = false;
	const ToggleModal = () => {
		showModal = !showModal;
	};

	let usertype: string,
		postalcode: number,
		firstname: string,
		lastname: string,
		phone: number,
		email: string,
		password: string,
		streetaddress: string,
		city: string,
		state: string,
		firstnameInputError: string,
		lastnameInputError: string,
		phoneInputError: string,
		emailInputError: string,
		passwordInputError: string,
		streetAddressInputError: string,
		cityInputError: string,
		postalCodeInputError: string;
	let showPassword: boolean = false;

	function validateFirstName() {
		const nameRegex = /^[A-Za-z]+$/;

		if (!nameRegex.test(firstname)) {
			firstnameInputError = 'First name can only contain letters.';
		} else {
			firstnameInputError = '';
		}
	}

	function validateLastName() {
		const nameRegex = /^[A-Za-z]+$/;

		if (!nameRegex.test(lastname)) {
			lastnameInputError = 'Last name can only contain letters.';
		} else {
			lastnameInputError = '';
		}
	}

	function validatePhoneNumber() {
		const phoneString = phone.toString();
		const phoneRegex = /^\d{10}$/;
		if (!phoneRegex.test(phoneString)) {
			phoneInputError = 'Please provide a valid 10 digit phone number';
		} else {
			phoneInputError = '';
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

	function validateStreetAddress() {
		const addressRegex = /^[a-zA-Z0-9#,. -]+$/;

		if (!addressRegex.test(streetaddress)) {
			streetAddressInputError = 'Street address can only contain letters, numbers, #, ,, ., and -';
		} else {
			streetAddressInputError = '';
		}
	}

	function validateCity() {
		const cityRegex = /^[A-Za-z]+$/;

		if (!cityRegex.test(city)) {
			cityInputError = 'City name can contain only letters';
		} else {
			cityInputError = '';
		}
	}

	function validatePostalcode() {
		const postalCodeString = postalcode.toString();
		const postalCodeRegex = /^\d{6}$/;
		if (!postalCodeRegex.test(postalCodeString)) {
			postalCodeInputError = 'Please enter a valid 6 digit postal code';
		} else {
			postalCodeInputError = '';
		}
	}

	async function handleSubmit() {
		const formData = {
			usertype: parseInt(usertype),
			firstname,
			lastname,
			phone,
			email,
			password,
			streetaddress,
			city,
			postalcode,
			state
		};

		if (!validateFormData(formData)) {
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

			if (response.ok) {
				console.log('Signup successful!');
			} else {
				console.error('Signup failed:', response.statusText);
			}
		} catch (error) {
			console.error('Error signing up:', error);
		}
	}

	function validateFormData(formData: any) {
		if (
			!formData.firstname ||
			!formData.lastname ||
			!formData.phone ||
			!formData.email ||
			!formData.password ||
			!formData.streetaddress ||
			!formData.city ||
			!formData.postalcode ||
			!formData.state
		) {
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

<div class="border">
	<NavBar {ToggleModal} />
</div>
<div class="bg-[#fcefb4] flex flex-col justify-center items-center py-10">
	<header class="py-4">
		<h1 class="text-3xl font-bold text-center">Register</h1>
	</header>
	<form
		class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3 mt-10"
		on:submit|preventDefault={handleSubmit}
	>
		<label class="block text-gray-700 text-sm font-bold mb-2" for="usertype">What are you:</label>
		<select
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
			id="usertype"
			bind:value={usertype}
		>
			<option value={customer_id}>A Customer</option>
			<option value={tailor_id}>A Tailor</option>
			<option value={merchant_id}>A Merchant</option>
		</select>

		<label class="block text-gray-700 text-sm font-bold mb-2" for="firstname">First Name:</label>
		<input
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
			type="text"
			id="firstname"
			bind:value={firstname}
			on:input={validateFirstName}
			required
		/>
		{#if firstnameInputError}
			<p class="text-red-500 text-xs italic">{firstnameInputError}</p>
		{/if}

		<label class="block text-gray-700 text-sm font-bold mb-2" for="lastname">Last Name:</label>
		<input
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
			type="text"
			id="lastname"
			bind:value={lastname}
			on:input={validateLastName}
			required
		/>
		{#if lastnameInputError}
			<p class="text-red-500 text-xs italic">{lastnameInputError}</p>
		{/if}

		<label class="block text-gray-700 text-sm font-bold mb-2" for="phone">Phone Number:</label>
		<input
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
			type="tel"
			id="phone"
			bind:value={phone}
			on:input={validatePhoneNumber}
			required
		/>
		{#if phoneInputError}
			<p class="text-red-500 text-xs italic">{phoneInputError}</p>
		{/if}

		<label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email:</label>
		<input
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
			type="email"
			id="email"
			bind:value={email}
			on:input={validateEmail}
			required
		/>
		{#if emailInputError}
			<p class="text-red-500 text-xs italic">{emailInputError}</p>
		{/if}

		<label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password:</label>
		<div class="relative">
			{#if showPassword}
				<input
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
					id="password"
					type="password"
					bind:value={password}
					on:input={validatePassword}
					required
				/>
			{:else}
				<input
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
					id="password"
					type="text"
					bind:value={password}
					on:input={validatePassword}
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
		{#if passwordInputError}
			<p class="text-red-500 text-xs italic">{passwordInputError}</p>
		{/if}

		<label class="block text-gray-700 text-sm font-bold mb-2" for="streetaddress"
			>Street Address:</label
		>
		<input
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
			type="text"
			id="streetaddress"
			bind:value={streetaddress}
			on:input={validateStreetAddress}
			required
		/>
		{#if streetAddressInputError}
			<p class="text-red-500 text-xs italic">{streetAddressInputError}</p>
		{/if}

		<label class="block text-gray-700 text-sm font-bold mb-2" for="city">City:</label>
		<input
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
			type="text"
			id="city"
			bind:value={city}
			on:input={validateCity}
			required
		/>
		{#if cityInputError}
			<p class="text-red-500 text-xs italic">{cityInputError}</p>
		{/if}

		<label class="block text-gray-700 text-sm font-bold mb-2" for="postalcode">Postal Code:</label>
		<input
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
			type="text"
			id="postalcode"
			bind:value={postalcode}
			on:input={validatePostalcode}
			required
		/>
		{#if postalCodeInputError}
			<p class="text-red-500 text-xs italic">{postalCodeInputError}</p>
		{/if}

		<label class="block text-gray-700 text-sm font-bold mb-2" for="state">State:</label>
		<div class="relative">
			<select
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-6"
				id="state"
				bind:value={state}
				required
			>
				<option value="" disabled selected>Select your state</option>
				<option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
				<option value="Andhra Pradesh">Andhra Pradesh</option>
				<option value="Arunachal Pradesh">Arunachal Pradesh</option>
				<option value="Assam">Assam</option>
				<option value="Bihar">Bihar</option>
				<option value="Chandigarh">Chandigarh</option>
				<option value="Chhattisgarh">Chhattisgarh</option>
				<option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
				<option value="Daman and Diu">Daman and Diu</option>
				<option value="Delhi">Delhi</option>
				<option value="Goa">Goa</option>
				<option value="Gujarat">Gujarat</option>
				<option value="Haryana">Haryana</option>
				<option value="Himachal Pradesh">Himachal Pradesh</option>
				<option value="Jammu and Kashmir">Jammu and Kashmir</option>
				<option value="Jharkhand">Jharkhand</option>
				<option value="Karnataka">Karnataka</option>
				<option value="Kerala">Kerala</option>
				<option value="Ladakh">Ladakh</option>
				<option value="Lakshadweep">Lakshadweep</option>
				<option value="Madhya Pradesh">Madhya Pradesh</option>
				<option value="Maharashtra">Maharashtra</option>
				<option value="Manipur">Manipur</option>
				<option value="Meghalaya">Meghalaya</option>
				<option value="Mizoram">Mizoram</option>
				<option value="Nagaland">Nagaland</option>
				<option value="Odisha">Odisha</option>
				<option value="Puducherry">Puducherry</option>
				<option value="Punjab">Punjab</option>
				<option value="Rajasthan">Rajasthan</option>
				<option value="Sikkim">Sikkim</option>
				<option value="Tamil Nadu">Tamil Nadu</option>
				<option value="Telangana">Telangana</option>
				<option value="Tripura">Tripura</option>
				<option value="Uttar Pradesh">Uttar Pradesh</option>
				<option value="Uttarakhand">Uttarakhand</option>
				<option value="West Bengal">West Bengal</option>
			</select>
			<div
				class="pointer-events-none absolute inset-y-0 right-0 flex justify-center items-center px-2 text-gray-700"
			>
				<div class="absolute top-1.5 right-2">
					<svg class="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
						<path
							fill-rule="evenodd"
							d="M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
						/>
					</svg>
				</div>
			</div>
		</div>
		<button
			class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
			type="submit">Sign Up</button
		>
	</form>
</div>

<Footer {ToggleModal} />
