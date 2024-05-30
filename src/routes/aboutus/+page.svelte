<script>
	let showModal = false;
	const ToggleModal = () => {
		showModal = !showModal;
	};
</script>

<body class="bg-[#f2ece1]">
	<div class="border">
		<nav class="bg-white top-0 w-full bg-transparent p-2.5 z-10 shadow-xl h-24">
			<div class="container mx-auto flex justify-between items-center h-full">
				<div class="flex items-center">
					<a href="/"><img alt="logo" src="logo.jpg" class="w-auto h-12" /></a>
					<div class="text-4xl font-bold ml-4" style="color: #e1b42f;">
						<a href="/" style="font-family: Sweaty;">CozyWear</a>
					</div>
				</div>
				<ul class="flex space-x-4">
					<li><a href="/" class="text-black text-sm">Home</a></li>
					<li><a href="/aboutus" class="text-black text-sm">About Us</a></li>
					<li><a href="#" class="text-black text-sm">Services</a></li>
					<li>
						<a href="#" class="contact text-black text-sm" on:click={ToggleModal}>Contact Us</a>
					</li>
					<li><a href="/login" id="Sign" class=" text-sm" style="color: #e1b42f;">Login</a></li>
					<li>
						<a href="/register" id="Sign" class=" text-sm" style="color: #e1b42f;">Register</a>
					</li>
				</ul>
			</div>
		</nav>
	</div>
	<main class="max-w-8xl mx-auto p-8 bg-[#f2ece1] h-2/3">
		<!-- <nav class="mb-8 flex justify-between items-center">
			<div>
				<a
					href="/"
					class="mr-4 inline-block py-2 px-4 rounded-lg shadow transition duration-300 ease-in-out hover:shadow-md"
					>Home</a
				>|
				<a
					href="aboutus"
					class="mr-4 inline-block py-2 px-4 font-bold rounded-lg shadow transition duration-300 ease-in-out hover:shadow-md"
					>About Us</a
				>|
				<a
					href="login"
					class="mr-4 inline-block py-2 px-4 rounded-lg shadow transition duration-300 ease-in-out hover:shadow-md"
					>Login</a
				>|
				<a
					href="register"
					class="inline-block py-2 px-4 rounded-lg shadow transition duration-300 ease-in-out hover:shadow-md"
					>Register</a
				>
			</div>
		</nav> -->
		<header class="py-4">
			<h1 class="text-3xl font-bold text-center">About Us</h1>
		</header>
		<section class="mb-8 w-1/2 mx-auto">
			<h2 class="text-xl font-semibold mb-4 text-center">Welcome to CozyWear!</h2>
			<p class="mb-2 text-justify">
				Welcome to our world of bespoke elegance, where the artistry of our merchants and tailors
				intertwines to create a symphony of style and substance. Here, the journey of sartorial
				splendor begins with the selection of luxurious fabrics from our esteemed merchants, each
				imbued with a story waiting to be told. With a palette of possibilities in hand, our
				customers embark on a voyage of self-expression, exploring the exquisite designs and
				intricate details offered by our masterful tailors. As they curate their unique ensemble,
				our innovative preview feature brings their vision to life, allowing them to step into the
				realm of their creation and see themselves adorned in perfection. With every stitch, we
				weave together craftsmanship and creativity, ensuring that each garment is a reflection of
				the wearer's distinct personality and refined taste. Moreover, rest assured, our priority is
				to ensure your attire is not just stylish but also incredibly comfy, crafted with the finest
				materials for ultimate comfort. Welcome to a realm where dreams are tailored into reality,
				and every shopping experience is a masterpiece in the making.
			</p>
		</section>
	</main>
	<footer class="bg-gray-800 text-white py-8">
		<div class="container mx-auto px-4">
			<div class="flex ml-44">
				<div class="w-full lg:w-1/3 px-4 mb-4 lg:mb-0">
					<h2 class="text-2xl font-semibold mb-2" style="color: #e1b42f;">CozyWear</h2>
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
		<p class="text-white-600 text-sm flex justify-center">
			&copy; 2024 CozyWear. All rights reserved.
		</p>
	</footer>
</body>
