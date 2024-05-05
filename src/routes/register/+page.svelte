<script lang="ts">
	import { api_url } from '$lib/constants';

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

<h1>Signup</h1>

<form on:submit|preventDefault={handleSubmit}>
	<label for="usertype">User Type:</label>
	<select id="usertype" bind:value={usertype}>
		<option value="0">Customer</option>
		<option value="1">Merchant</option>
		<option value="2">Tailor</option>
	</select>

	<label for="firstname">First Name:</label>
	<input type="text" id="firstname" bind:value={firstname} required />

	<label for="lastname">Last Name:</label>
	<input type="text" id="lastname" bind:value={lastname} required />

	<label for="email">Email:</label>
	<input type="email" id="email" bind:value={email} required />

	<label for="password">Password:</label>
	<input type="password" id="password" bind:value={password} required />

	<label for="streetaddress">Street Address:</label>
	<input type="text" id="streetaddress" bind:value={streetaddress} required />

	<label for="city">City:</label>
	<input type="text" id="city" bind:value={city} required />

	<label for="postalcode">Postal Code:</label>
	<input type="text" id="postalcode" bind:value={postalcode} required />

	<label for="state">State:</label>
	<input type="text" id="state" bind:value={state} required />

	<button type="submit">Sign Up</button>
</form>
