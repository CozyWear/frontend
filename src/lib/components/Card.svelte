<div class="card">
	<img src="src\lib\components\fabric.jpg" alt="fabric Image" class="fabric-image" />
	<div class="input-group">
		<label>Design Name:</label>
		<input type="text" />
	</div>
	<div class="input-group">
		<label>Material required:</label>
		<input type="text" />
	</div>
	<div class="input-group">
		<label>Range of sizes:</label>
		<input type="text" />
	</div>
	<div class="input-group">
		<label>Cost of sewing:</label>
		<input type="text" />
	</div>
</div>

<style>
	.card {
		width: 300px;
		height: 350px;
		padding: 16px;
		margin: 30px;
		border: 1px solid #ccc;
		border-radius: 12px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
		background-color: #d3d3d3;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.fabric-image {
		width: 100%;
		height: 40%;
		border-radius: 12px;
		object-fit: cover;
		margin-bottom: 12px;
	}

	.input-group {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
	}

	.input-group label {
		flex: 1;
		margin-right: 5px;
		font-weight: bold;
		font-size: 12px;
	}

	.input-group input {
		flex: 1.5;
		font-size: 12px;
		padding: 4px;
		height: 28px;
		border: 1px solid #ccc;
		border-radius: 25px;
		background-color: #f8f9fa;
		box-sizing: border-box;
		width: 100%;
	}
</style>
