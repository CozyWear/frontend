<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { CircleAlert } from 'lucide-svelte';
	import { Alert, AlertDescription, AlertTitle } from '$lib/components/ui/alert';
	import { Toaster } from 'svelte-sonner';
	let isLoading = $state(false);

	function handleLogout() {
		isLoading = true;
		// Simulating logout process
		setTimeout(() => {
			isLoading = false;
			// Show success message
			Toaster.success('You have been successfully logged out.');
			// Redirect to login page or home page after logout
			// window.location.href = "/login";
		}, 2000);
	}
</script>

<div class="container mx-auto flex min-h-screen items-center justify-center px-4 py-8">
	<Card class="w-full max-w-md">
		<CardHeader>
			<CardTitle>Logout Confirmation</CardTitle>
			<CardDescription>Are you sure you want to log out?</CardDescription>
		</CardHeader>
		<CardContent>
			<Alert variant="destructive">
				<CircleAlert class="h-4 w-4" />
				<AlertTitle>Warning</AlertTitle>
				<AlertDescription
					>Logging out will end your current session. Make sure you've saved any important work.</AlertDescription
				>
			</Alert>
		</CardContent>
		<CardFooter class="flex justify-between">
			<Button variant="outline" on:click={() => history.back()}>Cancel</Button>
			<Button variant="destructive" on:click={handleLogout} disabled={isLoading}>
				{#if isLoading}
					Logging out...
				{:else}
					Logout
				{/if}
			</Button>
		</CardFooter>
	</Card>
</div>

<Toaster />
