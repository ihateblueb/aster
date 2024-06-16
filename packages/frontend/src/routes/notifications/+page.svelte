<script>
	import { locale } from '$lib/locale';

	import PageHeader from '$lib/components/PageHeader.svelte';

	import notificationsGet from '$lib/api/notifications/get';
	import Notifications from '$lib/components/widgets/Notifications.svelte';
</script>

<template>
	<PageHeader title={locale('notifications')} />
	<div class="pageContent">
		<div class="paddedPage">
			{#await notificationsGet() then notifications}
				{#each notifications as notification}
					{#if notification.type === 'follow'}
						<div>
							{notification.from} followed you
						</div>
					{:else if notification.type === 'followrequest'}
						<div>
							{notification.from} requested to follow you
						</div>
					{:else}
						<div>
							{JSON.stringify(notification)}
						</div>
					{/if}
				{/each}
			{/await}
		</div>
	</div>
</template>
