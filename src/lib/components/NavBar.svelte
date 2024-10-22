<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Sheet, SheetContent, SheetTrigger } from '$lib/components/ui/sheet';
	import { Menu, LogOut } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { userType } from '../../routes/store';

	let loggedIn = false;
	userType.subscribe((value) => {
		loggedIn = value != -1;
	});
</script>

<nav class="sticky top-0 z-10 w-full bg-white p-4 shadow-md">
	<div class="container mx-auto flex items-center justify-between">
		<div class="flex items-center space-x-4">
			<a href="/" class="flex items-center space-x-2">
				<img src="/logo.jpg" alt="CozyWear Logo" class="h-10 w-auto" />
				<span class="text-2xl font-bold text-yellow-500">CozyWear</span>
			</a>
		</div>

		<div class="hidden max-w-md flex-1 px-4 lg:block">
			<Input type="search" placeholder="Search..." class="w-full" />
		</div>

		<div class="hidden items-center space-x-4 lg:flex">
			<a href="/" class="text-sm text-gray-600 hover:text-gray-900">Home</a>
			<a href="/aboutus" class="text-sm text-gray-600 hover:text-gray-900">About Us</a>
			<a href="/contactus" class="text-sm text-gray-600 hover:text-gray-900">Contact Us</a>

			{#if loggedIn}
				<LogOut class="mr-2 h-4 w-4" />
				<Button variant="ghost" on:click={() => goto('/logout')}>Logout</Button>
			{:else}
				<Button variant="outline" on:click={() => goto('/login')}>Login</Button>
				<Button on:click={() => goto('/register')}>Register</Button>
			{/if}
		</div>

		<Sheet>
			<SheetTrigger class="lg:hidden">
				<Menu class="h-6 w-6" />
			</SheetTrigger>
			<SheetContent side="left">
				<nav class="flex flex-col space-y-4">
					<a href="/" class="text-sm text-gray-600 hover:text-gray-900">Home</a>
					<a href="/aboutus" class="text-sm text-gray-600 hover:text-gray-900">About Us</a>
					<a href="/contactus" class="text-sm text-gray-600 hover:text-gray-900">Contact Us</a>
					{#if loggedIn}
						<Button variant="ghost" on:click={() => goto('/logout')}>Logout</Button>
					{:else}
						<Button variant="outline" on:click={() => goto('/login')}>Login</Button>
						<Button on:click={() => goto('/register')}>Register</Button>
					{/if}
				</nav>
			</SheetContent>
		</Sheet>
	</div>
</nav>
