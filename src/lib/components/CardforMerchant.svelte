<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    let materialName = '';
    let sizesAvailable = '';
    let costPerInch = '';

    function handleSave() {
        if (materialName && sizesAvailable && costPerInch) {
            dispatch('save', {
                materialName,
                sizesAvailable,
                costPerInch
            });
        } else {
            alert("Please fill all fields before saving.");
        }
    }
</script>

<div class="card">
    <img src="cloth.jpg" alt="cloth Image" class="cloth-image" />
    
    <div class="inputs">
        <label>Material Name:</label>
        <input type="text" bind:value={materialName} />
    </div>
    <div class="inputs">
        <label>Sizes Available:</label>
        <input type="number" bind:value={sizesAvailable} />
    </div>
    <div class="inputs">
        <label>Cost Per Inch:</label>
        <input type="number" bind:value={costPerInch} />
    </div>
    <button on:click={handleSave} class="button">
        Save
    </button>
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
        transition: transform 0.3s, box-shadow 0.3s;
    }

    .card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    }

    .cloth-image {
        width: 100%;
        height: 60%;
        border-radius: 12px;
        object-fit: fill;
        margin-bottom: 12px;
    }

    .inputs {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }

    .inputs label {
        flex: 1;
        margin-right: 5px;
        font-weight: bold;
        font-size: 12px;
    }

    .inputs input {
        flex: 1.5;
        font-size: 12px;
        padding: 4px;
        height: 28px;
        border: 1px solid #ccc;
        border-radius: 25px;
        background-color: #f8f9fa;
        box-sizing: border-box;
        width: 100%;
        transition: border-color 0.3s, background-color 0.3s;
    }

    .inputs input:focus {
        border-color: #007bff;
        background-color: #fff;
        outline: none;
    }

    .inputs input::placeholder {
        color: #999;
    }

    .inputs input:hover {
        background-color: #e9ecef;
    }

    .inputs label {
        transition: color 0.3s;
    }

    .inputs label:hover {
        color: #007bff;
    }

    .button {
        background-color: #000;
        color: #fff;
        border: 1px solid #000;
        padding: 5px 10px;
        margin: 10px 0;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1rem;
        text-align: center;
        transition: background-color 0.3s, color 0.3s, transform 0.3s;
    }

    .button:hover {
        background-color: #333;
        color: #fff;
        transform: scale(1.05);
    }

    .button:active {
        background-color: #555;
        color: #fff;
        transform: scale(1);
    }
</style>
