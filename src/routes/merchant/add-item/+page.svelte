<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Card } from '$lib/components/ui/card';
	import { Plus } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { onMount } from 'svelte';
	import { api_url } from '$lib/constants';

	type ViewAttribute = {
		name: string;
		value: string;
		inputType: string;
		options?: { type_id: string; name: string }[];
	};

	let attributes: ViewAttribute[] = $state([
		{ name: 'Material Name', value: '', inputType: 'text' },
		{ name: 'Material Type', value: '', inputType: 'select', options: [] },
		{ name: 'Cost Per Unit (m^2)', value: '', inputType: 'number' },
		{ name: 'Stock Quantity', value: '', inputType: 'number' }
	]);

	async function fetchMaterialTypes() {
		try {
			const res = await fetch(`${api_url}/merchant/material-types`);
			const data = await res.json();
			const materialTypeAttr = attributes.find((attr) => attr.name === 'Material Type');
			if (materialTypeAttr) materialTypeAttr.options = data;
		} catch (error) {
			console.error('Error fetching material types:', error);
		}
	}

	let imageFile: { file: File; url: string } | null = $state(null);

	function handleImageUpload(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.files && target.files.length > 0) {
			const file = target.files[0];
			const url = URL.createObjectURL(file);
			imageFile = { file, url };
		}
	}

	function triggerFilePicker() {
		const fileInput = document.getElementById('imageUpload') as HTMLInputElement;
		if (fileInput) {
			fileInput.click();
		}
	}

	async function saveItem() {
		const formData = new FormData();
		if (imageFile?.file) {
			formData.append('image_file', imageFile.file);
		} else {
			toast.error('Please select an image');
			throw new Error('No image selected');
		}

		const data = {
			material_name: attributes.find((attr) => attr.name === 'Material Name')?.value,
			material_type: attributes.find((attr) => attr.name === 'Material Type')?.value,
			cost_per_unit: Number(attributes.find((attr) => attr.name === 'Cost Per Unit (m^2)')?.value),
			stock_quantity: Number(attributes.find((attr) => attr.name === 'Stock Quantity')?.value)
		};
		formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));

		try {
			const res = await fetch(`${api_url}/merchant/add`, {
				method: 'POST',
				body: formData
			});

			toast.success('Item saved successfully!');

			imageFile = null;
			attributes = attributes.map((attr) => ({ ...attr, value: '' }));
		} catch (error) {
			console.error('Error saving item:', error);
			toast.error('Failed to save item. Please try again.');
		}
	}

	onMount(fetchMaterialTypes);
</script>

<div class="container mx-auto mt-8 p-4">
	<div class="flex flex-wrap gap-8">
		<Card class="flex h-96 w-72 items-center justify-center overflow-hidden">
			{#if imageFile}
				<img src={imageFile.url} alt="Selected Material" class="h-full w-full object-cover" />
			{:else}
				<Button variant="outline" size="icon" class="h-16 w-16" on:click={triggerFilePicker}>
					<Plus class="h-8 w-8" />
				</Button>
			{/if}
			<Input
				type="file"
				accept="image/*"
				on:change={handleImageUpload}
				class="hidden"
				id="imageUpload"
			/>
		</Card>
		<div class="flex-1 space-y-4">
			{#each attributes as attribute}
				<div class="grid w-full max-w-sm items-center gap-1.5">
					<Label for={attribute.name.toLowerCase().replace(/\s+/g, '-')} class="text-primary">
						{attribute.name}
					</Label>

					{#if attribute.inputType === 'select'}
						<select
							id={attribute.name.toLowerCase().replace(/\s+/g, '-')}
							bind:value={attribute.value}
							class="w-full rounded border px-2 py-1"
						>
							<option value="" disabled>Select {attribute.name.toLowerCase()}</option>
							{#each attribute.options! as option}
								<option value={option.type_id}>{option.name}</option>
							{/each}
						</select>
					{:else if attribute.inputType == 'number'}
						<Input
							type={attribute.inputType}
							id={attribute.name.toLowerCase().replace(/\s+/g, '-')}
							bind:value={attribute.value}
							placeholder={`Enter ${attribute.name.toLowerCase()}`}
							min="0"
						/>
					{:else}
						<Input
							type={attribute.inputType}
							id={attribute.name.toLowerCase().replace(/\s+/g, '-')}
							bind:value={attribute.value}
							placeholder={`Enter ${attribute.name.toLowerCase()}`}
						/>
					{/if}
				</div>
			{/each}
			<Button class="mt-4" onclick={saveItem}>Save Item</Button>
		</div>
	</div>
</div>
