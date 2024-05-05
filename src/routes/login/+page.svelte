<script lang="ts">
	import { api_url } from '$lib/constants';

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

<form on:submit|preventDefault={handleSubmit}>
	<label for="email">Email:</label>
	<input type="email" id="email" bind:value={email} required />

	<label for="password">Password:</label>
	<input type="password" id="password" bind:value={password} required />

	<label for="userType">User Type:</label>
	<select id="userType" bind:value={usertype}>
		<option value="0">Customer</option>
		<option value="1">Merchant</option>
		<option value="2">Tailor</option>
	</select>

	<button type="submit">Login</button>
</form>
