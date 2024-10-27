<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Card } from '$lib/components/ui/card';
	import { Plus } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { onMount } from 'svelte';
	import { api_url } from '$lib/constants';
	import { base } from '$app/paths';

	type ViewAttribute = {
		name: string;
		value: string;
		inputType: string;
		options?: { type_id: string; name: string }[];
		id: string;
	};

	let attributes: ViewAttribute[] = $state([
		{ name: 'Style Name', value: '', inputType: 'text', id: 'style_name' },
		{ name: 'Description', value: '', inputType: 'text', id: 'description' },
		{ name: 'Base Style Type', value: '', inputType: 'select', options: [], id: 'base_style_type' },
		{ name: 'Fit Type', value: '', inputType: 'select', options: [], id: 'fit_type' },
		{ name: 'Style Type', value: '', inputType: 'select', options: [], id: 'style_type' },
		{ name: 'Material Type', value: '', inputType: 'select', options: [], id: 'material_type' },
		{ name: 'Cost Per Unit', value: '', inputType: 'number', id: 'cost_per_unit' }
	]);

	async function fetchFitTypes() {
		try {
			const res = await fetch(`${api_url}/tailor/fit-types`);
			const data = await res.json();
			const fittypeAttr = attributes.find((attr) => attr.name === 'Fit Type');
			if (fittypeAttr)
				fittypeAttr.options = data.map((type: { fit_id: string; name: string }) => ({
					type_id: type.fit_id,
					name: type.name
				}));
		} catch (error) {
			console.error('Error fetching fit types:', error);
		}
	}

	let baseType: string = $derived(
		attributes.find((attr) => attr.name === 'Base Style Type')!.value!
	);

	async function fetchStyleTypes() {
		const baseStyleType = attributes.find((attr) => attr.name === 'Base Style Type')?.value;
		if (!baseStyleType) return;

		try {
			const res = await fetch(`${api_url}/tailor/style-types/${baseStyleType}`);
			if (!res.ok) throw new Error(`Failed to fetch style types: ${res.status} ${res.statusText}`);

			const data = await res.json();
			const styletypeAttr = attributes.find((attr) => attr.name === 'Style Type');
			if (styletypeAttr)
				styletypeAttr.options = data.map((type: { style_id: string; name: string }) => ({
					type_id: type.style_id,
					name: type.name
				}));
		} catch (error) {
			console.error('Error fetching style types:', error);
		}
	}

	async function fetchMaterialTypes() {
		try {
			const res = await fetch(`${api_url}/merchant/material-types`);
			const data = await res.json();
			const materialtypeAttr = attributes.find((attr) => attr.name === 'Material Type');
			if (materialtypeAttr) materialtypeAttr.options = data;
		} catch (error) {
			console.error('Error fetching fit types:', error);
		}
	}

	async function fetchBaseStyleTypes() {
		try {
			const res = await fetch(`${api_url}/tailor/base-style-types`);
			const data = await res.json();
			const basestyletypeAttr = attributes.find((attr) => attr.name === 'Base Style Type');
			if (basestyletypeAttr)
				basestyletypeAttr.options = data.map((type: { base_id: string; name: string }) => ({
					type_id: type.base_id,
					name: type.name
				}));
		} catch (error) {
			console.error('Error fetching base style types:', error);
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
			style_name: attributes.find((attr) => attr.name === 'Style Name')?.value,
			fit_type: attributes.find((attr) => attr.name === 'Fit Type')?.value,
			cost_per_unit: Number(attributes.find((attr) => attr.name === 'Cost Per Unit')?.value),
			style_type: attributes.find((attr) => attr.name === 'Style Type')?.value,
			material_type_required: attributes.find((attr) => attr.name === 'Material Type')?.value,
			description: attributes.find((attr) => attr.name === 'Description')?.value
		};
		formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));

		try {
			const res = await fetch(`${api_url}/tailor/add`, {
				method: 'POST',
				body: formData
			});

			if (res.ok) {
				toast.success('Item saved successfully!');
				imageFile = null;
				attributes = attributes.map((attr) => ({ ...attr, value: '' }));
			} else if (res.status === 400) {
				toast.error('Invalid Input');
			}
		} catch (error) {
			console.error('Error saving item:', error);
			toast.error('Failed to save item. Please try again.');
		}
	}

	onMount(() => {
		fetchFitTypes();
		fetchMaterialTypes();
		fetchBaseStyleTypes();
	});

	$effect(() => {
		const baseStyleType = attributes.find((attr) => attr.name === 'Base Style Type')?.value;
		if (baseStyleType) {
			fetchStyleTypes();
		}
	});
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
							id={attribute.id}
							class="w-full rounded border px-2 py-1"
							bind:value={attribute.value}
						>
							<option value="" disabled>Select {attribute.name.toLowerCase()}</option>
							{#each attribute.options! as option}
								<option value={option.type_id}>{option.name}</option>
							{/each}
						</select>
					{:else if attribute.inputType == 'number'}
						<Input
							type={attribute.inputType}
							id={attribute.id}
							bind:value={attribute.value}
							placeholder={`Enter ${attribute.name.toLowerCase()}`}
							min="0"
						/>
					{:else}
						<Input
							type={attribute.inputType}
							id={attribute.id}
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
