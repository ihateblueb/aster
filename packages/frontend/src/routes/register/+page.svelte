<script>
	import InfoBox from '$lib/components/InfoBox.svelte';

	let username = '';
	let password = '';
	let invite = '';

	async function startLogin() {
		var credentialsToSend = btoa(`${username}:${password}`);

		await fetch(`/api/v1/register`, {
			method: 'POST',
			body: credentialsToSend
		});
	}

	export let data;
</script>

<template>
	<div class="pageContent">
		<div class="paddedPage">
			<div class="authCtn">
				<h1>Register to {data.name}</h1>
				<p>{data.description_short}</p>
				{#if data.registration === 'closed'}
					<InfoBox type="warn">
						Registrations are currently closed.
					</InfoBox>
				{:else if data.registration === 'invite0'}
					<InfoBox type="warn">
						Registrations require an invite code.
					</InfoBox>
				{:else if data.registration === 'invite1'}
					<InfoBox type="warn">
						Registrations require an invite code.
					</InfoBox>
				{:else if data.registration === 'open'}
					<InfoBox type="success">
						Registrations are currently open.
					</InfoBox>
				{/if}
				<input
					class="ipt"
					type="invite"
					placeholder="Invite Code"
					bind:value={invite}
				/>
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
				<b>Instance Rules</b>
				<ol>
					{#each data.rules as rule}
						<li>{rule}</li>
					{/each}
				</ol>
				<button class="btn" on:click={startLogin}>Register</button>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
	.paddedPage {
		display: flex;
		justify-content: center;
		align-content: center;

		.authCtn {
			display: block;
			width: min-content;
			margin: 35px 0px 35px 0px;

			.ipt {
				margin: 5px 0px 5px 0;
			}
			h1 {
				font-size: 20px;
				margin-bottom: 6px;
			}
			p {
				font-size: 16px;
				margin-bottom: 10px;
				color: var(--txt-tertiary);
			}
			b {
				display: block;
				padding-top: 10px;
			}
			ol {
				margin: 6px 0px 6px 0;
				padding-left: 30px;
			}
			li {
				padding: 2px 0px 2px 0;
			}
		}
	}
</style>
