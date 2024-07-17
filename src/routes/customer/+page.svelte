<script lang="ts">
	import { onMount } from 'svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Popup from '$lib/components/Popup.svelte';

	const trendingImg = ['t1.jpg', 'k2.jpg', 't3.jpg', 'm4.jpg'];
	const men = ['m1.jpg', 'm2.jpg', 'm3.jpg', 'm4.jpg'];
	const kid = ['k1.jpg', 'k2.jpg', 'k3.jpg', 'k4.jpg'];
	const women = ['t1.jpg', 't2.jpg', 't3.jpg', 't4.jpg'];

	let kidIndex = 0;
	let womenIndex = 0;
	let menIndex = 0;
	let trendingIndex = 0;

	let showPopup = false;
	let popupImageSrc = '';
	let popupMaterial = '';
	let popupName = '';
	let popupFit = '';

	function displayPopup(imageSrc: string, Design: string, name: string, fit: string) {
		popupImageSrc = imageSrc;
		popupMaterial = Design;
		popupName = name;
		popupFit = fit;
		showPopup = true;
	}

	//Trending Slide show
	onMount(() => {
		const container = document.getElementById('trending');

		const createImage = () => {
			container.innerHTML = '';

			for (let i = trendingIndex; i < trendingIndex + 4; i++) {
				const img = document.createElement('img');
				img.src = trendingImg[i % trendingImg.length];
				img.className = 'h-auto w-56 pt-3.5 pl-5 rounded-3xl';
				img.addEventListener('click', () => {
					displayPopup(img.src, 'Title', 'dfs', 'dfs');
				});
				container.appendChild(img);
			}
		};

		createImage();

		const cycleImg = () => {
			trendingIndex = (trendingIndex + 1) % trendingImg.length;
			createImage();
		};

		const TleftArrow = document.getElementById('TleftArrow');
		const TrightArrow = document.getElementById('TrightArrow');

		TleftArrow.addEventListener('click', () => {
			trendingIndex = (trendingIndex - 1 + trendingImg.length) % trendingImg.length;
			createImage();
		});

		TrightArrow.addEventListener('click', () => {
			trendingIndex = (trendingIndex + 1) % trendingImg.length;
			createImage();
		});

		//const trendingInterval = setInterval(cycleImg, 4000);
	});

	//Men Slide Show
	onMount(() => {
		const container = document.getElementById('men');

		const createImage = () => {
			container.innerHTML = '';

			for (let i = menIndex; i < menIndex + 4; i++) {
				const img = document.createElement('img');
				img.src = men[i % men.length];
				img.className = 'h-auto w-56 pt-3.5 pl-5';
				img.addEventListener('click', () => {
					displayPopup(img.src, 'Title', 'Description', 'dfs');
				});
				container.appendChild(img);
			}
		};

		createImage();

		const cycleImg = () => {
			menIndex = (menIndex + 1) % men.length;
			createImage();
		};
		const MleftArrow = document.getElementById('MleftArrow');
		const MrightArrow = document.getElementById('MrightArrow');

		MleftArrow.addEventListener('click', () => {
			menIndex = (menIndex - 1 + men.length) % men.length;
			createImage();
		});

		MrightArrow.addEventListener('click', () => {
			menIndex = (menIndex + 1) % men.length;
			createImage();
		});

		//const menInterval = setInterval(cycleImg, 4000);
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
					displayPopup(img.src, 'Title', 'Description', 'dfs');
				});
				container.appendChild(img);
			}
		};

		createImage();

		const cycleImg = () => {
			kidIndex = (kidIndex + 1) % kid.length;
			createImage();
		};

		const KleftArrow = document.getElementById('KleftArrow');
		const KrightArrow = document.getElementById('KrightArrow');

		KleftArrow.addEventListener('click', () => {
			kidIndex = (kidIndex - 1 + kid.length) % kid.length;
			createImage();
		});

		KrightArrow.addEventListener('click', () => {
			kidIndex = (kidIndex + 1) % kid.length;
			createImage();
		});

		//const kidInterval = setInterval(cycleImg, 4000);
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
					displayPopup(img.src, 'Title', ' Banarasi saree', 'Traditional');
				});
				container.appendChild(img);
			}
		};

		createImage();

		const cycleImg = () => {
			womenIndex = (womenIndex + 1) % women.length;
			createImage();
		};

		const WleftArrow = document.getElementById('WleftArrow');
		const WrightArrow = document.getElementById('WrightArrow');

		WleftArrow.addEventListener('click', () => {
			womenIndex = (womenIndex - 1 + women.length) % women.length;
			createImage();
		});

		WrightArrow.addEventListener('click', () => {
			womenIndex = (womenIndex + 1) % women.length;
			createImage();
		});

		//const womenInterval = setInterval(cycleImg, 4000);
	});
</script>

<NavBar />

<div
	class="bg-cover bg-center h-96 mt-1 w-full flex items-end justify-center"
	style="background-image: url('ps1.jpg');"
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
<div class="flex justify-center items-center">
	<button id="TleftArrow">←</button>
	<div class="flex justify-center items-center" id="trending" style="padding: 15px 15px;"></div>
	<button id="TrightArrow">→</button>
</div>

<h1 class="text-center text-3xl font-semibold mt-8" style="color: #e1b42f; padding-top: 15px;">
	Men
</h1>
<div class="flex justify-center items-center">
	<button id="MleftArrow">←</button>
	<div class="flex justify-center items-center" id="men" style="padding: 15px 15px;"></div>
	<button id="MrightArrow">→</button>
</div>
<h1 class="text-center text-3xl font-semibold mt-8" style="color: #e1b42f; padding-top: 15px;">
	Kids
</h1>
<div class="flex justify-center items-center">
	<button id="KleftArrow">←</button>
	<div class="flex justify-center items-center" id="kid" style="padding: 15px 15px;"></div>
	<button id="KrightArrow">→</button>
</div>
<h1 class="text-center text-3xl font-semibold mt-8" style="color: #e1b42f; padding-top: 15px;">
	Women
</h1>
<div class="flex justify-center items-center">
	<button id="WleftArrow">←</button>
	<div class="flex justify-center items-center" id="women" style="padding: 15px 15px;"></div>
	<button id="WrightArrow">→</button>
</div>

<Popup
	bind:show={showPopup}
	imageSrc={popupImageSrc}
	Design={popupMaterial}
	name={popupName}
	fit={popupFit}
	on:close={() => (showPopup = false)}
/>

<Footer />
