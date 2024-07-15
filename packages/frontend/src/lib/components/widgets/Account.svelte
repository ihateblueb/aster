<script>
	import Store from '$lib/utils/Store';
	import Avatar from '../Avatar.svelte';
	import Mfm from '../Mfm.svelte';

	let account = JSON.parse(Store.get('account'));
</script>

<template>
	<div class="account _66pAv1X">
		<a href={'/@' + account.username} class="displayname subtle">
			<Avatar
				src={account.avatar}
				alt={account.avatar_alt}
				isCat={account.is_cat}
				size="40px"
			/></a
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
