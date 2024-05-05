

<svelte:head>
    <title>Register</title>
</svelte:head>

<article>
    <header>
        <p>do you wanna register or login</p>
    </header>
    <main>
        <a href="/src/routes/merchant/login.svelte" class="button">login</a>
        <a href="/src/routes/merchant/register.svelte" class="button">register</a>
       
    </main>
</article>

<style>
    p {
        font-size: 3rem;
        text-align: center;
    }

    a {
        font-size: 5rem;
        text-align: center;
        text-align: center;
        font-family: Arial, Helvetica, sans-serif;
        width: 80%;
        margin: 0% 10% 10% 5%;
    }
</style>
