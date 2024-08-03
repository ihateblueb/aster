<script>
	import { locale } from '$lib/locale';

	import PageHeader from '$lib/components/PageHeader.svelte';

	import notificationsGet from '$lib/api/notifications/get';
	import Notification from '$lib/components/Notification.svelte';
</script>

<template>
	<PageHeader title={locale('notifications')} icon="bell" />
	<div class="pageContent">
		<div class="paddedPage">
			{#await notificationsGet() then notifications}
				{#each notifications as notification}
					<Notification data={notification} />
				{/each}
			{/await}
		</div>
	</div>
</template>
