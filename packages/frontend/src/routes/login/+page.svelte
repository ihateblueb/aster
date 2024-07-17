<script>
	import { goto, invalidateAll } from '$app/navigation';

	import { locale } from '$lib/locale';
	import Store from '$lib/utils/Store';

	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import InfoBox from '$lib/components/InfoBox.svelte';

	let username = '';
	let password = '';

	let loginRes = {};
	let accountRes = {};

	async function startLogin() {
		var credentialsToSend = btoa(`${username}:${password}`);

		var loginReq = await fetch(`/api/v2/login`, {
			method: 'POST',
			body: credentialsToSend
		});

		loginRes = await loginReq.json();

		if (loginReq.status === 200) {
			Store.set('a_token', loginRes.token);

			var accountReq = await fetch(`/api/v2/user/${loginRes.id}`);
			accountRes = await accountReq.json();

			if (accountReq.status === 200) {
				Store.set('account', JSON.stringify(accountRes));
				location.replace('/');
			}
		}
	}

	export let data;
</script>

<template>
	<div class="pageContent">
		<div class="paddedPage">
			<div class="authCtn">
				<h1>{locale('login_to')} {data.name}</h1>
				<p>{data.description}</p>
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
