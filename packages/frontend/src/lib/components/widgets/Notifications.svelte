<script>
	import notificationsGet from '$lib/api/notifications/get';
	import { locale } from '$lib/locale';
	import Icon from '../Icon.svelte';
	import Notification from '../Notification.svelte';
</script>

<template>
	<div class="containedWidget">
		<div class="header">
			<Icon name="bell" size="18px" />
			{locale('notifications')}
		</div>
		<div class="content">
			{#await notificationsGet() then notifications}
				{#each notifications as notification}
					<Notification data={notification} small />
				{/each}
			{/await}
		</div>
	</div>
</template>
