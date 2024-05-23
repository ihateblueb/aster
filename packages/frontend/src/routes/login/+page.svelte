<script>
	let username;
	let password;

	function startLogin() {
		console.log('starting login...');
		var credentialsToSend = btoa(`${username}:${password}`);
	}
</script>

<input type="username" bind:value={username} />
<input type="password" bind:value={password} />
<button on:click={startLogin}>submit</button>
