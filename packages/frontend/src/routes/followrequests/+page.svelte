<script>
	import { locale } from '$lib/locale';

	import getFollowrequests from '$lib/api/self/getFollowrequests';
	import acceptFollowrequest from '$lib/api/self/acceptFollowrequest';
	import denyFollowrequest from '$lib/api/self/denyFollowrequest';

	import PageHeader from '$lib/components/PageHeader.svelte';
	import Button from '$lib/components/Button.svelte';
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
					<div>
						You received a follow request from {request.from}.
						<Button on:click={() => acceptFollowrequest(request.id)}
							>Accept</Button
						>
						<Button on:click={() => denyFollowrequest(request.id)}
							>Deny</Button
						>
					</div>
				{/each}
			{/await}
		</div>
	</div>
</template>
