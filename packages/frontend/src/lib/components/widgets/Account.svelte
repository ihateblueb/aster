<script>
	import Store from '$lib/utils/Store';
	import Avatar from '../Avatar.svelte';
	import Mfm from '../Mfm.svelte';

	let account = JSON.parse(Store.get('account'));
</script>

<template>
	<div class="account">
		<a href={'/@' + account.username} class="displayname subtle"
			><Avatar data={account} size="40px" /></a
		>
		<div class="usernames">
			<a href={'/@' + account.username} class="displayname subtle"
				><Mfm content={account.displayname} simple /></a
			>
			<a href={'/@' + account.username} class="username subtle"
				>@{account.username}</a
			>
		</div>
	</div>
</template>

<style lang="scss">
	.account {
		display: flex;
		align-items: center;
		.usernames {
			display: flex;
			justify-content: center;
			flex-direction: column;
			padding-left: 10px;
			padding-right: 10px;
			.displayname {
				font-weight: 600;
			}
			.username {
				font-size: var(--font-s);
			}
		}
	}
</style>
