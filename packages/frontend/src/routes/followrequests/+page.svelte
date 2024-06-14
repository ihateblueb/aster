<script>
	import { locale } from '$lib/locale';

	import getFollowrequests from '$lib/api/self/getFollowrequests';
	import acceptFollowrequest from '$lib/api/self/acceptFollowrequest';
	import denyFollowrequest from '$lib/api/self/denyFollowrequest';

	import userGet from '$lib/api/user/get';

	import PageHeader from '$lib/components/PageHeader.svelte';
	import Button from '$lib/components/Button.svelte';
	import Avatar from '$lib/components/Avatar.svelte';
</script>

<svelte:head>
	<title>{locale('follow_requests')}</title>
</svelte:head>

<template>
	<PageHeader title={locale('follow_requests')} />
	<div class="pageContent">
		<div class="paddedPage">
			{#await getFollowrequests() then requests}
				{#each requests as request}
					{#await userGet(request.from) then from}
						<div class="followRequest">
							<div class="left">
								<a
									href={'/@' + from.username}
									class="displayname subtle"
									><Avatar data={from} size="45px" /></a
								>
								<div class="names">
									<a
										href={'/@' + from.username}
										class="displayname subtle"
										>{from.displayname}</a
									>
									<a
										href={'/@' + from.username}
										class="username subtle"
										>@{from.username}</a
									>
								</div>
							</div>
							<div class="right">
								<Button
									on:click={() =>
										acceptFollowrequest(request.id)}
									>Accept</Button
								>
								<Button
									on:click={() =>
										denyFollowrequest(request.id)}
									>Deny</Button
								>
							</div>
						</div>
					{/await}
				{/each}
			{/await}
		</div>
	</div>
</template>

<style lang="scss">
	.followRequest {
		display: flex;
		margin-bottom: 15px;
		padding: 15px;
		border-radius: var(--border-xl);
		background-color: var(--bg-secondary);

		.left {
			display: flex;
			flex-grow: 2;

			> .names {
				display: inline-flex;
				justify-content: center;
				flex-direction: column;
				margin-left: 10px;
				> a {
					display: block;
					&.displayname {
						font-weight: 600;
					}
					&.username {
						font-size: var(--font-m);
					}
				}
			}
		}
		.right {
			display: flex;
			gap: 5px;
		}
	}
</style>
