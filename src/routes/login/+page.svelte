<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Alert, AlertDescription } from '$lib/components/ui/alert';
	import { api_url, userTypes } from '$lib/constants';
	import { Eye, EyeOff } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

	let email = $state('');
	let password = $state('');
	let usertype = $state(-1);
	let showPassword = $state(false);
	let error = $state('');

	async function handleSubmit() {
		error = '';
		const formData = {
			email,
			password,
			usertype: usertype
		};

		try {
			const response = await fetch(`${api_url}/accounts/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
				credentials: 'include'
			});

			if (response.ok) {
				setTimeout(() => {
					toast.success('Logged In Successfully');
				}, 1000);

				switch (usertype) {
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
						goto('/');
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
				toast.error('Unable to log in');
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
		onsubmit={(e) => {
			e.preventDefault();
			handleSubmit();
		}}
	>
		{#if error}
			<Alert variant="destructive" class="mb-4">
				<AlertDescription>{error}</AlertDescription>
			</Alert>
		{/if}
		<div class="space-y-4">
			<div class="space-y-2">
				<Label for="email">Email</Label>
				<Input id="email" type="email" bind:value={email} required />
			</div>
			<div class="space-y-2">
				<Label for="password">Password</Label>
				<div class="relative">
					<Input
						type={showPassword ? 'text' : 'password'}
						id="password"
						bind:value={password}
						required
					/>
					<Button
						type="button"
						variant="ghost"
						class="absolute right-2 top-1/2 -translate-y-1/2"
						onclick={() => (showPassword = !showPassword)}
					>
						{#if !showPassword}
							<EyeOff class="h-4 w-4" />
						{:else}
							<Eye class="h-4 w-4" />
						{/if}
					</Button>
				</div>
			</div>
			<div class="space-y-2">
				<label for="userType">What are you</label>
				<select bind:value={usertype} class="w-full rounded border border-gray-300 p-2">
					<option value="" disabled selected>User Type</option>
					{#each userTypes as [type, value]}
						<option {value}>{type}</option>
					{/each}
				</select>
			</div>
			<Button type="submit" class="w-full">Login</Button>
		</div>
	</form>
</div>
