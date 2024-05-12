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
