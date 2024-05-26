<script>
	let username = '';
	let password = '';

	async function startLogin() {
		var credentialsToSend = btoa(`${username}:${password}`);

		await fetch(`/api/v1/login`, {
			method: 'POST',
			body: credentialsToSend
		});
	}
</script>

<div class="pageContent">
	<div class="paddedPage">
		<div class="loginCtn">
			<h1>Login</h1>
			<input
				class="ipt"
				type="username"
				placeholder="Username"
				bind:value={username}
			/>
			<input
				class="ipt"
				type="password"
				placeholder="Password"
				bind:value={password}
			/>
			<br />
			<button class="btn" on:click={startLogin}>Login</button>
		</div>
	</div>
</div>

<style lang="scss">
	.paddedPage {
		display: flex;
		justify-content: center;
		align-content: center;

		.loginCtn {
			display: block;
			width: min-content;

			h1 {
				font-size: 20px;
				margin: 4px;
				margin-bottom: 12px;
			}
		}
	}
</style>
