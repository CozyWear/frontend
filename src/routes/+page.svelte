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
		<textarea name="Complaint" style="width: 80%; margin:5%;" placeholder="Enter Your Feedback Here"
		></textarea>
		<br />
		<button>Submit</button>
	</form>
</Modal>

<div class="button-container">
	<button on:click={ToggleModal} class="buttons">Contact Us</button>
</div>

<div class="border">
	<nav class="bg-white top-0 w-full bg-transparent p-2.5 z-10 shadow-xl h-24 ">
		<div class="container mx-auto flex justify-between items-center h-full">
			<div class="text-4xl font-bold text-yellow-400"><a href="#">CozyWear</a></div>
			<ul class="flex space-x-4">
				<li><a href="#" class="text-black text-sm">Home</a></li>
				<li><a href="#" class="text-black text-sm">About Us</a></li>
				<li><a href="#" class="text-black text-sm">Services</a></li>
				<li><a href="#" class=" contact text-black text-sm">Contact Us</a></li>
				<li><a href="#" id="Sign" class="text-yellow-400 text-sm">Sign In</a></li>
				<li><a href="#" id="Sign" class="text-yellow-400 text-sm">Sign Up</a></li>
			</ul>
		</div>
	</nav>
</div>
<div class="container">
	<div class="flex justify-around items-center text-white mt-1">
		<div class="text-center">
			<a href="#">
				<img
					src="man-gentleman-black-suit-tie-white-45182272.webp"
					alt="Men"
					class="w-16 h-16 mt-0.5 rounded-full"
				/>
			</a>
			<p class="font-semibold text-yellow-400 text-sm">Men</p>
		</div>
		<div class="text-center">
			<a href="#">
				<img src="kids.webp" alt="Kids" class="w-16 h-16 mt-0.5 rounded-full" />
			</a>
			<p class="font-semibold text-yellow-400 text-sm">Kids</p>
		</div>
		<div class="text-center">
			<a href="#">
				<img src="woman.webp" alt="Women" class="w-16 h-16 mt-0.5 rounded-full" />
			</a>
			<p class="font-semibold text-yellow-400 text-sm">Women</p>
		</div>
	</div>

	<div class="bg-cover bg-center h-96 mt-1 w-auto" style="background-image: url('ps1.jpg');"></div>

	<h1 class="text-center text-3xl font-semibold text-yellow-400 mt-8">Popular Combos</h1>
	<div class="flex justify-center items-center h-96 pb-5">
		<div class="pc m-2.5"><a href="#"><img src="t1.jpg" alt="Combo 1" class="h-auto w-60 pt-3.5 pl-5" /></a></div>
		<div class="pc m-2.5"><a href="#"><img src="t2.jpg" alt="Combo 2" class="h-auto w-60 pt-3.5 pl-5" /></a></div>
		<div class="pc m-2.5"><a href="#"><img src="t3.jpg" alt="Combo 3" class="h-auto w-60 pt-3.5 pl-5" /></a></div>
		<div class="pc m-2.5"><a href="#"><img src="t4.jpg" alt="Combo 4" class="h-auto w-60 pt-3.5 pl-5" /></a></div>
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
</div>

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
