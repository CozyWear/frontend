<script lang="ts">
	import { onMount } from 'svelte';

	let name = '';
	let email = '';
	let phone = '';
	let subject = '';
	let message = '';
	let submitted = false;

	function handleSubmit(event) {
		event.preventDefault();
		submitted = true;
		setTimeout(() => {
			submitted = false;
		}, 5000);
		name = '';
		email = '';
		phone = '';
		subject = '';
		message = '';
	}

	onMount(() => {
		window.scrollTo(0, 0);
	});
</script>

<div class="page-container">
	<div class="content-wrapper">
		<div class="main-content">
			<div class="contact-form-container">
				<h2>Contact Us</h2>
				{#if submitted}
					<p class="success-message">
						Thank you for contacting us! We will get back to you shortly.
					</p>
				{/if}
				<form on:submit={handleSubmit}>
					<div class="form-group">
						<label for="name">Name:</label>
						<input type="text" id="name" bind:value={name} required />
					</div>
					<div class="form-group">
						<label for="email">Email:</label>
						<input type="email" id="email" bind:value={email} required />
					</div>
					<div class="form-group">
						<label for="phone">Phone Number:</label>
						<input type="tel" id="phone" bind:value={phone} required />
					</div>
					<div class="form-group">
						<label for="subject">Subject:</label>
						<input type="text" id="subject" bind:value={subject} required />
					</div>
					<div class="form-group">
						<label for="message">Message:</label>
						<textarea id="message" bind:value={message} required></textarea>
					</div>
					<button type="submit" class="button">Submit</button>
				</form>
			</div>
		</div>
	</div>
</div>

<style>
	.page-container {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.content-wrapper {
		display: flex;
		flex: 1;
		overflow-x: hidden;
		padding: 20px;
		background-color: #f0f4f8;
	}

	.main-content {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.contact-form-container {
		width: 100%;
		max-width: 600px;
		padding: 30px;
		border: 1px solid #ccc;
		border-radius: 12px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
		background-color: #fff;
	}

	.contact-form-container h2 {
		text-align: center;
		margin-bottom: 24px;
		color: #333;
	}

	.form-group {
		margin-bottom: 20px;
	}

	.form-group label {
		display: block;
		margin-bottom: 8px;
		font-weight: bold;
		color: #555;
	}

	.form-group input,
	.form-group textarea {
		width: 100%;
		padding: 12px;
		border: 1px solid #ccc;
		border-radius: 14px;
		background-color: #f8f9fa;
		box-sizing: border-box;
		transition:
			border-color 0.3s,
			background-color 0.3s;
	}

	.form-group input:focus,
	.form-group textarea:focus {
		border-color: #007bff;
		background-color: #fff;
		outline: none;
	}

	.form-group input::placeholder,
	.form-group textarea::placeholder {
		color: #999;
	}

	.form-group input:hover,
	.form-group textarea:hover {
		background-color: #e9ecef;
	}

	.button {
		width: 100%;
		padding: 14px;
		background-color: #000f1a;
		color: #fff;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 16px;
		transition:
			background-color 0.3s,
			color 0.3s,
			transform 0.3s;
	}

	.button:hover {
		background-color: #33334d;
		transform: scale(1.05);
	}

	.button:active {
		background-color: #003d7a;
		transform: scale(1);
	}

	.success-message {
		color: green;
		text-align: center;
		margin-bottom: 20px;
		font-size: 1.2rem;
	}
</style>
