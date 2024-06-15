<script lang="ts">
	import { onMount } from 'svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Popup from '$lib/components/Popup.svelte';

	const trendingImg = ['t1.jpg', 'k2.jpg', 't3.jpg', 'm4.jpg'];
	const images = ['ps1.jpg', 'ps2.jpg', 'ps3.jpg', 'ps4.jpg'];
	const men = ['m1.jpg', 'm2.jpg', 'm3.jpg', 'm4.jpg'];
	const kid = ['k1.jpg', 'k2.jpg', 'k3.jpg', 'k4.jpg'];
	const women = ['t1.jpg', 't2.jpg', 't3.jpg', 't4.jpg'];

	let kidIndex = 0;
	let womenIndex = 0;
	let menIndex = 0;
	let currentIndex = 0;
	const interval = 4000;
	const totalImages = images.length;
	let trendingIndex = 0;

	let showPopup = false;
	let popupImageSrc = '';
	let popupTitle = '';
	let popupDescription = '';

	function displayPopup(imageSrc: string, title: string, description: string) {
		console.log('Displaying popup with', imageSrc, title, description);
		popupImageSrc = imageSrc;
		popupTitle = title;
		popupDescription = description;
		showPopup = true;
	}
	//Slide Show
	onMount(() => {
		const gallery = document.getElementById('slide');

		const slideShow = () => {
			gallery.style.opacity = 0;
			gallery.style.filter = 'brightness(80%)';

			setTimeout(() => {
				gallery.style.backgroundImage = `url(${images[currentIndex]})`;
				gallery.style.opacity = 1;
				currentIndex = (currentIndex + 1) % totalImages;
			}, 500);

			setTimeout(() => {
				gallery.style.opacity = 0;
			}, interval - 100);
		};

		slideShow();

		const inter = setInterval(slideShow, interval);

		return () => {
			clearInterval(inter);
		};
	});
	//Trending Slide show
	onMount(() => {
		const container = document.getElementById('combos');

		const createImage = () => {
			container.innerHTML = '';

			for (let i = trendingIndex; i < trendingIndex + 4; i++) {
				const img = document.createElement('img');
				img.src = trendingImg[i % trendingImg.length];
				img.className = 'h-auto w-56 pt-3.5 pl-5 rounded-3xl';
				img.addEventListener('click', () => {
					displayPopup(img.src, 'Title', 'Description');
				});
				container.appendChild(img);
			}
		};

		createImage();

		const cycleImg = () => {
			trendingIndex = (trendingIndex + 1) % trendingImg.length;
			createImage();
		};

		const trendingInterval = setInterval(cycleImg, 4000);
	});
	//Men Slide Show
	onMount(() => {
		const container = document.getElementById('men');

		const createImage = () => {
			container.innerHTML = '';

			for (let i = menIndex; i < menIndex + 4; i++) {
				const img = document.createElement('img');
				img.src = men[i % men.length];
				img.className = 'h-auto w-56 pt-3.5 pl-5 rounded-3xl';
				img.addEventListener('click', () => {
					displayPopup(img.src, 'Title', 'Description');
				});
				container.appendChild(img);
			}
		};

		createImage();

		const cycleImg = () => {
			menIndex = (menIndex + 1) % men.length;
			createImage();
		};

		const menInterval = setInterval(cycleImg, 4000);
	});
	//Kid Slide Show
	onMount(() => {
		const container = document.getElementById('kid');

		const createImage = () => {
			container.innerHTML = '';

			for (let i = kidIndex; i < kidIndex + 4; i++) {
				const img = document.createElement('img');
				img.src = kid[i % kid.length];
				img.className = 'h-auto w-56 pt-3.5 pl-5 rounded-3xl';
				img.addEventListener('click', () => {
					displayPopup(img.src, 'Title', 'Description');
				});
				container.appendChild(img);
			}
		};

		createImage();

		const cycleImg = () => {
			kidIndex = (kidIndex + 1) % kid.length;
			createImage();
		};

		const kidInterval = setInterval(cycleImg, 4000);
	});

	//Women Slide Show
	onMount(() => {
		const container = document.getElementById('women');

		const createImage = () => {
			container.innerHTML = '';

			for (let i = womenIndex; i < womenIndex + 4; i++) {
				const img = document.createElement('img');
				img.src = women[i % women.length];
				img.className = 'h-auto w-56 pt-3.5 pl-5 rounded-3xl';
				img.addEventListener('click', () => {
					displayPopup(img.src, 'Title', 'Description');
				});
				container.appendChild(img);
			}
		};

		createImage();

		const cycleImg = () => {
			womenIndex = (womenIndex + 1) % women.length;
			createImage();
		};

		const womenInterval = setInterval(cycleImg, 4000);
	});
</script>

<NavBar />

<div
	class="bg-cover bg-center h-96 mt-1 w-full flex items-end justify-center"
	style="margin: 0; transition: opacity 0.5s ease;"
	id="slide"
>
	<button
		style="background-color: #e1b42f; margin-bottom: 20px; padding: 8px 12px; font-weight: bold;"
		class="rounded-3xl text-white"
	>
		Customize Your Style
	</button>
</div>

<h1 class="text-center text-3xl font-semibold mt-8" style="color: #e1b42f; padding-top: 15px;">
	Trending
</h1>
<div class="flex justify-center items-center" id="combos" style="padding: 15px 15px;"></div>

<h1 class="text-center text-3xl font-semibold mt-8" style="color: #e1b42f; padding-top: 15px;">
	Men
</h1>
<div class="flex justify-center items-center" id="men" style="padding: 15px 15px;"></div>
<h1 class="text-center text-3xl font-semibold mt-8" style="color: #e1b42f; padding-top: 15px;">
	Kids
</h1>
<div class="flex justify-center items-center" id="kid" style="padding: 15px 15px;"></div>
<h1 class="text-center text-3xl font-semibold mt-8" style="color: #e1b42f; padding-top: 15px;">
	Women
</h1>
<div class="flex justify-center items-center" id="women" style="padding: 15px 15px;"></div>

<Popup
	bind:show={showPopup}
	imageSrc={popupImageSrc}
	title={popupTitle}
	description={popupDescription}
	on:close={() => (showPopup = false)}
/>

<Footer />
