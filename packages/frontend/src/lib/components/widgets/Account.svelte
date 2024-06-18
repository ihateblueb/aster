<script>
	import Store from '$lib/utils/Store';
	import Avatar from '../Avatar.svelte';
	import Mfm from '../Mfm.svelte';

	let account = JSON.parse(Store.get('account'));
</script>

<template>
	<div class="account">
		<Avatar data={account} size="40px" />
		<div>
			<Mfm content={account.displayname} />
		</div>
	</div>
</template>

<style lang="scss">
	.account {
		display: flex;
		align-items: center;
	}
</style>
