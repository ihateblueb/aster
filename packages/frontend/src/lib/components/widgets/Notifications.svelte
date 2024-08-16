<script>
	import notificationsGet from '$lib/api/notifications/get';
	import Notification from '../Notification.svelte';
</script>

<template>
	{#await notificationsGet() then notifications}
		{#each notifications as notification}
			<Notification data={notification} small />
		{/each}
	{/await}
</template>
