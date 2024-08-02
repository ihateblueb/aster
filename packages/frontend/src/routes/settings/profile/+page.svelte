<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { locale } from '$lib/locale';

	import PageHeader from '$lib/components/PageHeader.svelte';
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import Select from '$lib/components/Select.svelte';
	import SelectItem from '$lib/components/SelectItem.svelte';
	import Store from '$lib/utils/Store';
	import updateAccount from '$lib/api/user/update';
	import InfoBox from '$lib/components/InfoBox.svelte';

	let account = JSON.parse(Store.get('account'));
	let updatedAccount = {};

	// TODO: update only modified values

	if (account) {
		updatedAccount = account;
	} else {
		goto('/');
	}

	async function update() {
		console.log(updatedAccount);
		let res = await updateAccount(updatedAccount);

		if (res.message === 'Updated user') {
			account = res.user;
			updatedAccount = res.user;
			Store.set('account', JSON.stringify(res.user));
		}
	}
</script>

<template>
	<PageHeader
		title={locale('s_account') + ' / ' + locale('profile')}
		icon="settings"
	/>
	<div class="pageContent _sVC9i48">
		{#key account}
			<div class="paddedPage">
				<h1>Profile</h1>

				<InfoBox>
					{locale('profile_image_notice')}
				</InfoBox>

				<Input
					type="wide mb"
					label={locale('displayname')}
					placeholder={account.displayname}
					bind:value={updatedAccount.displayname}
				/>
				<Input
					type="wide mb"
					big
					label={locale('bio')}
					placeholder={account.bio}
					bind:value={updatedAccount.bio}
				/>

				<Input
					type="wide mb"
					label={locale('location')}
					placeholder={account.location}
					bind:value={updatedAccount.location}
				/>

				<Input
					type="wide mb"
					label={locale('birthday')}
					placeholder={account.birthday}
					bind:value={updatedAccount.birthday}
				/>

				<Button on:click={update}>Update</Button>

				<br />

				<h1>ActivityPub</h1>
				<h2>Public Key</h2>
				<pre><code>{account.public_key}</code></pre>
				<h2>Private Key</h2>
				<Button>Request</Button>
			</div>
		{/key}
	</div>
</template>
