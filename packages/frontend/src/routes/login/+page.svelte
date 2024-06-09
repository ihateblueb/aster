<script>
	import { locale } from '$lib/locale';

	import InfoBox from '$lib/components/InfoBox.svelte';
	import Store from '$lib/scripts/Store';

	let username = '';
	let password = '';

	let loginRes = {};

	async function startLogin() {
		var credentialsToSend = btoa(`${username}:${password}`);

		var loginReq = await fetch(`/api/v1/login`, {
			method: 'POST',
			body: credentialsToSend
		});

		loginRes = await loginReq.json();

		if (loginReq.status === 200) {
			console.log('yaay! were logged in.');
			Store.set('a_token', loginRes.token);
		}
	}

	export let data;
</script>

<svelte:head>
	<title>{locale('login_to')} {data.name}</title>
</svelte:head>

<template>
	<div class="pageContent">
		<div class="paddedPage">
			<div class="authCtn">
				<h1>{locale('login_to')} {data.name}</h1>
				<p>{data.description_short}</p>
				{#if loginRes.message}
					<InfoBox type="danger">
						{loginRes.message}
					</InfoBox>
				{/if}
				<input
					class="ipt"
					type="username"
					placeholder={locale('username')}
					bind:value={username}
				/>
				<input
					class="ipt"
					type="password"
					placeholder={locale('password')}
					bind:value={password}
				/>
				<br />
				<button class="btn" on:click={startLogin}
					>{locale('login')}</button
				>
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
				font-size: var(--font-xxl);
				margin-bottom: 6px;
			}
			p {
				font-size: var(--font-l);
				margin-bottom: 10px;
				color: var(--txt-tertiary);
			}
		}
	}
</style>
