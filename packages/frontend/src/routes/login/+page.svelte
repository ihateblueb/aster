<script>
	let username = '';
	let password = '';

	async function startLogin() {
		console.log('starting login...');
		var credentialsToSend = btoa(`${username}:${password}`);

		const response = await fetch(`/api/v1/auth/login`, {
			method: 'POST',
			body: credentialsToSend
		});

		console.log(response);
	}
</script>

<input type="username" bind:value={username} />
<input type="password" bind:value={password} />
<button on:click={startLogin}>submit</button>
