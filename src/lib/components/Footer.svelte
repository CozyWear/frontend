<script lang="ts">
	import { Facebook, Twitter, Instagram } from 'lucide-svelte';
	import { Separator } from '$lib/components/ui/separator';
</script>

<footer class=" bg-gray-800 py-8 text-white">
	<div class="container mx-auto px-4">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
			<div>
				<h2 class="mb-4 text-2xl font-semibold text-[#e1b42f]">CozyWear</h2>
				<nav class="space-y-2">
					<a href="/aboutus" class="block hover:text-gray-400">About Us</a>
				</nav>
			</div>
			<div>
				<h2 class="mb-4 text-lg font-semibold">Support</h2>
				<nav class="space-y-2">
					<a href="/contactus" class="block hover:text-gray-400">Contact Us</a>
				</nav>
			</div>
			<div>
				<h2 class="mb-4 text-lg font-semibold">Follow Us</h2>
				<div class="flex space-x-4">
					<a href="#" class="hover:text-gray-400" aria-label="Facebook">
						<Facebook size={24} />
					</a>
					<a href="#" class="hover:text-gray-400" aria-label="Twitter">
						<Twitter size={24} />
					</a>
					<a href="#" class="hover:text-gray-400" aria-label="Instagram">
						<Instagram size={24} />
					</a>
				</div>
			</div>
		</div>
	</div>
	<Separator class="my-6 bg-gray-700" />
	<p class="text-center text-sm text-gray-400">&copy; 2024 CozyWear. All rights reserved.</p>
</footer>
