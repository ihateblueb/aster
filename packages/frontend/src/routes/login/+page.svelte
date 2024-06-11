<script>
	import { locale } from '$lib/locale';
	import Store from '$lib/utils/Store';

	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import InfoBox from '$lib/components/InfoBox.svelte';

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
				<Input
					formtype="username"
					placeholder={locale('username')}
					bind:value={username}
				/>
				<Input
					formtype="password"
					placeholder={locale('password')}
					bind:value={password}
				/>
				<br />
				<Button on:click={startLogin}>{locale('login')}</Button>
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
