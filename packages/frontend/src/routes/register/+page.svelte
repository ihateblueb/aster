<script>
	import { locale } from '$lib/locale';

	import Button from '$lib/components/Button.svelte';
	import InfoBox from '$lib/components/InfoBox.svelte';
	import Input from '$lib/components/Input.svelte';

	let username = '';
	let password = '';
	let invite = '';

	async function startLogin() {
		var credentialsToSend = btoa(`${username}:${password}`);

		await fetch(`/api/v2/register`, {
			method: 'POST',
			body: credentialsToSend
		});
	}

	export let data;
</script>

<template>
	<div class="pageContent">
		<div class="paddedPage _75tRk4l">
			<div class="authCtn">
				<h1>{locale('register_to')} {data.name}</h1>
				<p>{data.description}</p>
				{#if data.registration === 'closed'}
					<InfoBox type="warn">
						{locale('registrations_closed')}
					</InfoBox>
				{:else if data.registration === 'invite0'}
					<InfoBox type="warn">
						{locale('registrations_invite')}
					</InfoBox>
					<Input
						type="invite"
						placeholder={locale('invite_code')}
						bind:value={invite}
					/>
				{:else if data.registration === 'invite1'}
					<InfoBox type="warn">
						{locale('registrations_invite')}
					</InfoBox>
					<Input
						type="invite"
						placeholder={locale('invite_code')}
						bind:value={invite}
					/>
				{/if}
				<Input
					type="username"
					placeholder={locale('username')}
					bind:value={username}
				/>
				<Input
					type="password"
					placeholder={locale('password')}
					bind:value={password}
				/>
				{#if data.rules}
					<b>{locale('instance_rules')}</b>
					<ol>
						{#each data.rules as rule}
							<li>{rule}</li>
						{/each}
					</ol>
				{/if}
				<Button on:click={startLogin}>{locale('register')}</Button>
			</div>
		</div>
	</div>
</template>
