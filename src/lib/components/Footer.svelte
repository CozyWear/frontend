<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
</script>

<footer class="bg-gray-800 py-8 text-white">
	<div class="container mx-auto px-4">
		<div class="ml-44 flex">
			<div class="mb-4 w-full px-4 lg:mb-0 lg:w-1/3">
				<h2 class="mb-2 text-2xl font-semibold" style="color: #e1b42f;">CozyWear</h2>
				<ul class="list-none">
					<li><a href="/aboutus" class="hover:text-gray-400">About Us</a></li>
					<li><a href="/privacy-policy" class="hover:text-gray-400">Privacy Policy</a></li>
				</ul>
			</div>
			<div class="mb-4 w-full px-4 lg:mb-0 lg:w-1/3">
				<h2 class="mb-4 text-lg font-semibold">Support</h2>
				<ul class="list-none">
					<li><a href="/contactus" class="hover:text-gray-400">Contact Us</a></li>
				</ul>
			</div>
			<div class="mb-4 w-full px-4 lg:mb-0 lg:w-1/3">
				<h2 class="mb-4 text-lg font-semibold">Follow Us</h2>
				<ul class="list-none">
					<li><a href="#" class="hover:text-gray-400">Facebook</a></li>
					<li><a href="#" class="hover:text-gray-400">Twitter</a></li>
					<li><a href="#" class="hover:text-gray-400">Instagram</a></li>
				</ul>
			</div>
		</div>
	</div>
	<p class="text-white-600 flex justify-center text-sm">
		&copy; 2024 CozyWear. All rights reserved.
	</p>
</footer>
