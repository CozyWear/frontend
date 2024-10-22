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
	import { Toaster, toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { userType } from '../store';
	import { get } from 'svelte/store';
	import { onMount } from 'svelte';
	import { api_url } from '$lib/constants';

	onMount(() => {
		if (get(userType) === '-1') {
			goto('/');
		}
	});

	let isLoading = false;
	async function handleLogout() {
		isLoading = true;

		try {
			const response = await fetch(`${api_url}/accounts/logout`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (response.ok) {
				toast.success('You have been successfully logged out.');
			}
		} catch (e) {
			toast.error('Failed to logout');
		} finally {
			userType.set('-1');
			goto('/');
		}
	}
</script>

<div class="flex min-h-screen items-center justify-center bg-[#fcefb4]">
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
