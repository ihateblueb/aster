<script>
	import { page } from '$app/stores';
	import { locale } from '$lib/locale';

	import PageHeader from '$lib/components/PageHeader.svelte';
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import Select from '$lib/components/Select.svelte';
	import SelectItem from '$lib/components/SelectItem.svelte';
	import Store from '$lib/utils/Store';
	import { goto } from '$app/navigation';

	let account = Store.get('account');

	if (account) {
		account = JSON.parse(account);
	} else {
		goto('/');
	}
</script>

<template>
	<PageHeader title={locale('s_account')} icon="settings" />
	<div class="pageContent">
		<div class="paddedPage">
			<h1>Profile</h1>
			<Input
				type="wide mb"
				label={locale('displayname')}
				value={account.displayname}
			/>
			<Input
				type="wide mb"
				big
				label={locale('bio')}
				value={account.bio}
			/>
			<Input
				type="wide mb"
				label={locale('location')}
				value={account.location}
			/>
			<Input
				type="wide mb"
				label={locale('birthday')}
				value={account.birthday}
			/>
			<Button>Update</Button>

			<br />

			<h1>ActivityPub</h1>
			<h2>Public Key</h2>
			<pre><code>{account.public_key}</code></pre>
			<h2>Private Key</h2>
			<Button>Request</Button>
		</div>
	</div>
</template>

<style lang="scss">
	h1 {
		font-size: var(--font-xxl);
		margin-bottom: 12px;

		&:not(:first-child) {
			margin-top: 14px;
		}
	}

	h2 {
		font-size: var(--font-xl);
		margin-bottom: 10px;

		&:not(:first-child) {
			margin-top: 12px;
		}
	}

	pre {
		code {
			font-size: var(--font-xs);
		}
	}
</style>
