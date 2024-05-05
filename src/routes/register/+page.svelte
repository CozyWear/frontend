<script lang="ts">
	import { api_url } from '$lib/constants';
	import { customer_id, tailor_id, merchant_id } from '$lib/constants';

	let usertype: string,
		postalcode: string,
		firstname: string,
		lastname: string,
		email: string,
		password: string,
		streetaddress: string,
		city: string,
		state: string;

	async function handleSubmit() {
		const formData = {
			usertype: parseInt(usertype),
			firstname,
			lastname,
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
</script>

<svelte:head>
	<title>Register</title>
	<meta
		name="description"
		content="Register with CozyWear for cozy, stylish clothing and accessories. Sign up today for exclusive updates on our latest collections."
	/>
</svelte:head>

<div class="bg-black min-h-screen flex justify-center items-center">
	<form
		class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3"
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
			required
		/>

		<label class="block text-gray-700 text-sm font-bold mb-2" for="lastname">Last Name:</label>
		<input
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
			type="text"
			id="lastname"
			bind:value={lastname}
			required
		/>

		<label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email:</label>
		<input
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
			type="email"
			id="email"
			bind:value={email}
			required
		/>

		<label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password:</label>
		<input
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
			type="password"
			id="password"
			bind:value={password}
			required
		/>

		<label class="block text-gray-700 text-sm font-bold mb-2" for="streetaddress"
			>Street Address:</label
		>
		<input
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
			type="text"
			id="streetaddress"
			bind:value={streetaddress}
			required
		/>

		<label class="block text-gray-700 text-sm font-bold mb-2" for="city">City:</label>
		<input
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
			type="text"
			id="city"
			bind:value={city}
			required
		/>

		<label class="block text-gray-700 text-sm font-bold mb-2" for="postalcode">Postal Code:</label>
		<input
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
			type="text"
			id="postalcode"
			bind:value={postalcode}
			required
		/>

		<label class="block text-gray-700 text-sm font-bold mb-2" for="state">State:</label>
		<input
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-6"
			type="text"
			id="state"
			bind:value={state}
			required
		/>

		<button
			class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
			type="submit">Sign Up</button
		>
	</form>
</div>
