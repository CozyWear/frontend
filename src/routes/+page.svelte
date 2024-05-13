<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';

	let showModal = false;
	const ToggleModal = () => {
		showModal = !showModal;
	};
</script>

<Modal {showModal} on:click={ToggleModal}>
	<h3>Contact Us</h3>

	<form>
		<input type="text" placeholder="Name" class="inputs" />
		<br />
		<input type="text" placeholder="Email" class="inputs" />
		<br />
		<select
			style="width: 80%; margin:5% auto; border:1px solid ; padding:12px 8px; border-radius:10px; background-color: #fefefe;"
		>
			<option value="Customer">Customer</option>
			<option value="Merchant">Merchant</option>
			<option value="Tailor">Tailor</option>
		</select>
		<br />
		<textarea name="Feedback" style="width: 80%; margin:5%;" placeholder="Enter Your Feedback Here"
		></textarea>
		<br />
		<button>Submit</button>
	</form>
</Modal>

<div class="border">
	<nav class="bg-white top-0 w-full bg-transparent p-2.5 z-10 shadow-xl h-24">
		<div class="container mx-auto flex justify-between items-center h-full">
			<div class="flex items-center">
				<a href="/"><img alt="logo" src="icon.jpg" class="w-auto h-12" /></a>
				<div class="text-4xl font-bold text-yellow-400 ml-4">
					<a href="/">CozyWear</a>
				</div>
			</div>
			<ul class="flex space-x-4">
				<li><a href="/" class="text-black text-sm">Home</a></li>
				<li><a href="/aboutus" class="text-black text-sm">About Us</a></li>
				<li><a href="#" class="text-black text-sm">Services</a></li>
				<li>
					<a href="#" class="contact text-black text-sm" on:click={ToggleModal}>Contact Us</a>
				</li>
				<li><a href="/login" id="Sign" class="text-yellow-400 text-sm">Login</a></li>
				<li><a href="/register" id="Sign" class="text-yellow-400 text-sm">Register</a></li>
			</ul>
		</div>
	</nav>
</div>

<div class="flex justify-around items-center text-white mt-1">
	<div class="text-center">
		<a href="/category/men/">
			<img src="men.jpg" alt="Men" class="w-16 h-16 mt-0.5 rounded-full" />
		</a>
		<p class="font-semibold text-yellow-400 text-sm">Men</p>
	</div>
	<div class="text-center">
		<a href="/category/kids/">
			<img src="kid.jpg" alt="Kids" class="w-16 h-16 mt-0.5 rounded-full" />
		</a>
		<p class="font-semibold text-yellow-400 text-sm">Kids</p>
	</div>
	<div class="text-center">
		<a href="/category/women/">
			<img src="woman.jpg" alt="Women" class="w-16 h-16 mt-0.5 rounded-full" />
		</a>
		<p class="font-semibold text-yellow-400 text-sm">Women</p>
	</div>
</div>

<h1 class="text-center text-3xl font-semibold text-yellow-400 mt-8" id="ser">Our Services</h1>
<div class="grid grid-cols-4 gap-8 mt-4">
	<div class="text-center">
		<img src="fab.jpg" alt="Fabric Selection" class="w-64 mx-auto" />
		<p class="mt-2 font-semibold text-yellow-400">Fabric Selection</p>
	</div>
	<div class="text-center">
		<img src="ds.jpg" alt="Designer Consultation" class="w-64 mx-auto" />
		<p class="mt-2 font-semibold text-yellow-400">Designer Consultation</p>
	</div>
	<div class="text-center">
		<img src="exp.jpg" alt="Express Service" class="w-64 mx-auto" />
		<p class="mt-2 font-semibold text-yellow-400">Express Service</p>
	</div>
	<div class="text-center">
		<img src="p&d.jpg" alt="PickUp & Delhivery" class="w-64 mx-auto" />
		<p class="mt-2 font-semibold text-yellow-400">PickUp & Delhivery</p>
	</div>
</div>
<div
	class="bg-cover bg-center h-96 mt-1 w-full flex items-end justify-center"
	style="background-image: url('ps1.jpg');"
>
	<button style="background-color: #e1b42f; margin-bottom: 20px;" class="rounded-3xl text-white"
		>Customize Your Style</button
	>
</div>

<h1 class="text-center text-3xl font-semibold text-yellow-400 mt-8">Popular Combos</h1>
<div class="flex justify-center items-cent">
	<div class="pc m-2.5">
		<a href="#"><img src="t1.jpg" alt="Combo 1" class="h-auto w-60 pt-3.5 pl-5" /></a>
	</div>
	<div class="pc m-2.5">
		<a href="#"><img src="t2.jpg" alt="Combo 2" class="h-auto w-60 pt-3.5 pl-5" /></a>
	</div>
	<div class="pc m-2.5">
		<a href="#"><img src="t3.jpg" alt="Combo 3" class="h-auto w-60 pt-3.5 pl-5" /></a>
	</div>
	<div class="pc m-2.5">
		<a href="#"><img src="t4.jpg" alt="Combo 4" class="h-auto w-60 pt-3.5 pl-5" /></a>
	</div>
</div>

<h1 class="text-center text-3xl font-semibold text-yellow-400 mt-2" id="ser">Our Services</h1>
<div class="flex justify-center items-cent mt-4 mb-4">
	<div class="text-center">
		<img src="fab.jpg" alt="Fabric Selection" class="h-auto w-60 pt-3.5 pl-5 m-2.5" />
		<p class="mt-2 font-semibold text-yellow-400">Fabric Selection</p>
	</div>
	<div class="text-center">
		<img src="ds.jpg" alt="Designer Consultation" class="h-auto w-60 pt-3.5 pl-5 m-2.5" />
		<p class="mt-2 font-semibold text-yellow-400">Designer Consultation</p>
	</div>
	<div class="text-center">
		<img src="exp.jpg" alt="Express Service" class="h-auto w-60 pt-3.5 pl-5 m-2.5" />
		<p class="mt-2 font-semibold text-yellow-400">Express Service</p>
	</div>
	<div class="text-center">
		<img src="p&d.jpg" alt="PickUp & Delhivery" class="h-auto w-60 pt-3.5 pl-5 m-2.5" />
		<p class="mt-2 font-semibold text-yellow-400">PickUp & Delhivery</p>
	</div>
</div>

<footer class="bg-gray-800 text-white py-8">
	<div class="container mx-auto px-4">
		<div class="flex ml-44">
			<div class="w-full lg:w-1/3 px-4 mb-4 lg:mb-0">
				<h2 class="text-2xl font-semibold mb-2 text-amber-400">CozyWear</h2>
				<ul class="list-none">
					<li><a href="/aboutus" class="hover:text-gray-400">About Us</a></li>
					<li><a href="#" class="hover:text-gray-400" on:click={ToggleModal}>Contact Us</a></li>
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
</footer>

<style>
	.inputs {
		background-color: #fefefe;
		margin: 5% auto;
		padding: 10px;
		border: 1px solid #888;
		width: 80%;
		border-radius: 10px;
	}
	button {
		border: 0;
		cursor: pointer;
		padding: 8px 12px;
		font-weight: bold;
		box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
	}
	h3 {
		font-size: 24px;
	}
</style>
