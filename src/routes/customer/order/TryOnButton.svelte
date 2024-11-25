<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Client } from '@gradio/client';

	let processedImage: string | null = null;
	let loading = false;

	export let styleImageUrl: string;

	async function handleTryOn(event: Event) {
		const userImageFile = (event.target as HTMLInputElement).files?.[0];
		if (!userImageFile) return;

		loading = true;

		let userImageBlob = await userImageFile.arrayBuffer().then((buffer) => {
			return new Blob([buffer], { type: userImageFile.type });
		});

		let styleImageBlob = await fetch(styleImageUrl).then((res) => res.blob());

		const app = await Client.connect('Nymbo/Virtual-Try-On');
		try {
			const result = await app.predict('/tryon', [
				{ background: new Blob([userImageBlob]), layers: [], composite: null },
				new Blob([styleImageBlob]),
				'',
				true,
				true,
				30,
				42
			]);

			if (Array.isArray(result.data)) {
				const processedImages = result.data.map((item) => ({
					url: item.url,
					path: item.path,
					origName: item.orig_name
				}));

				if (processedImages.length > 0) {
					processedImage = processedImages[0].url;
				}
			} else {
				console.error('Unexpected data structure received:', result.data);
				processedImage = null;
			}
		} catch (error) {
			console.error('Error processing image:', error);
		} finally {
			loading = false;
			return;
		}
	}
</script>

<div class="flex flex-col items-center gap-4">
	<label for="try-on-input">
		<Button variant="secondary" size="lg">
			{loading ? 'Processing...' : 'Try On Virtually'}
		</Button>
	</label>
	<input type="file" id="try-on-input" accept="image/*" on:change={handleTryOn} />

	{#if processedImage}
		<div class="mt-4 overflow-hidden rounded-lg shadow-lg">
			<img src={processedImage} alt="Virtual try-on result" class="h-auto max-w-md" />
		</div>
	{/if}
</div>
