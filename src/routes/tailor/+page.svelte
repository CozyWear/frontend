<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Card from '$lib/components/Card.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';

	let showModal = false;
	const ToggleModal = () => {
		showModal = !showModal;
	};

	let cards = [{}, {}, {}];

	function handleAdd() {
		cards = [...cards, {}];
		updateSidebarHeight();
	}

	function handleRemove() {
		if (cards.length > 1) {
			cards.pop();
			cards = [...cards];
			updateSidebarHeight();
		}
	}

	function updateSidebarHeight() {
		const cardHeight = 350 + 70; // Card height plus *margin plus 2*padding
		const rows = Math.ceil(cards.length / 3);
		const contentHeight = rows * cardHeight;
		const navbarHeight = document.querySelector('header')?.offsetHeight || 0;
		const footerHeight = document.querySelector('footer')?.offsetHeight || 0;
		const availableHeight = window.innerHeight - navbarHeight - footerHeight;
		const newSidebarHeight = Math.max(contentHeight, availableHeight);
		document.querySelector('.sidebar-container').style.height = `${newSidebarHeight}px`;
	}

	onMount(() => {
		updateSidebarHeight();
	});

	afterUpdate(() => {
		updateSidebarHeight();
	});
</script>

<div class="page-container">
	<NavBar />

	<div class="content-wrapper">
		<Sidebar on:add={handleAdd} on:remove={handleRemove} />

		<div class="main-content">
			{#each cards as card}
				<Card />
			{/each}
		</div>
	</div>
</div>

<style>
	.page-container {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.content-wrapper {
		display: flex;
		flex: 1;
		overflow-x: hidden;
	}

	.main-content {
		flex: 1;
		display: inline-flex;
		flex-wrap: wrap;
		padding: 5px;
	}
</style>
