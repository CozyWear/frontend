<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
</script>

<footer class="bg-gray-800 text-white py-8">
	<div class="container mx-auto px-4">
		<div class="flex ml-44">
			<div class="w-full lg:w-1/3 px-4 mb-4 lg:mb-0">
				<h2 class="text-2xl font-semibold mb-2" style="color: #e1b42f;">CozyWear</h2>
				<ul class="list-none">
					<li><a href="/aboutus" class="hover:text-gray-400">About Us</a></li>
					<li><a href="/contactus" class="hover:text-gray-400">Contact Us</a></li>
					<li><a href="/privacy-policy" class="hover:text-gray-400">Privacy Policy</a></li>
				</ul>
			</div>
			<div class="w-full lg:w-1/3 px-4 mb-4 lg:mb-0">
				<h2 class="text-lg font-semibold mb-4">Support</h2>
				<ul class="list-none">
					<li><a href="/customer/order/" class="hover:text-gray-400">Place an Order</a></li>
					<li><a href="/customer/pricing" class="hover:text-gray-400">Pricing</a></li>
				</ul>
			</div>
			<div class="w-full lg:w-1/3 px-4 mb-4 lg:mb-0">
				<h2 class="text-lg font-semibold mb-4">Follow Us</h2>
				<ul class="list-none">
					<li><a href="#" class="hover:text-gray-400">Facebook</a></li>
					<li><a href="#" class="hover:text-gray-400">Twitter</a></li>
					<li><a href="#" class="hover:text-gray-400">Instagram</a></li>
				</ul>
			</div>
		</div>
	</div>
	<p class="text-white-600 text-sm flex justify-center">
		&copy; 2024 CozyWear. All rights reserved.
	</p>
</footer>
