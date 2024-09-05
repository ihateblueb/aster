<script>
	import { locale } from '$lib/locale';

	import followrequestGet from '$lib/api/followrequest/get';
	import followrequestAccept from '$lib/api/followrequest/accept';
	import followrequestDeny from '$lib/api/followrequest/deny';

	import userGet from '$lib/api/user/get';

	import PageHeader from '$lib/components/PageHeader.svelte';
	import Button from '$lib/components/Button.svelte';
	import Avatar from '$lib/components/Avatar.svelte';
</script>

<template>
	<PageHeader title={locale('follow_requests')} icon="user-plus" />
	<div class="pageContent">
		<div class="paddedPage">
			{#await followrequestGet() then requests}
				{#each requests as request}
					{#await userGet(request.from) then from}
						<div class="followRequest">
							<div class="left">
								<a
									href={'/@' + from.username}
									class="displayname subtle"
								>
									<Avatar
										src={from.avatar}
										alt={from.avatar_alt}
										isCat={from.is_cat}
										size="45px"
									/></a
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
										>@{from.username}{from.local
											? ''
											: '@' + from.host}</a
									>
								</div>
							</div>
							<div class="right">
								<Button
									on:click={() =>
										followrequestAccept(request.id)}
									>{locale('accept')}</Button
								>
								<Button
									on:click={() =>
										followrequestDeny(request.id)}
									>{locale('deny')}</Button
								>
							</div>
						</div>
					{/await}
				{/each}
			{/await}
		</div>
	</div>
</template>
