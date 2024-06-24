<script>
	import { locale } from '$lib/locale';

	import Button from '$lib/components/Button.svelte';
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
				{:else if data.registration === 'invite1'}
					<InfoBox type="warn">
						{locale('registrations_invite')}
					</InfoBox>
				{:else if data.registration === 'open'}
					<InfoBox type="success">
						{locale('registrations_open')}
					</InfoBox>
				{/if}
				<input
					class="ipt"
					type="invite"
					placeholder={locale('invite_code')}
					bind:value={invite}
				/>
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
				<b>{locale('instance_rules')}</b>
				<ol>
					{#each data.rules as rule}
						<li>{rule}</li>
					{/each}
				</ol>
				<Button on:click={startLogin}>{locale('register')}</Button>
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
