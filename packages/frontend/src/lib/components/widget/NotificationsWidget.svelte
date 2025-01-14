<script lang="ts">
	import WidgetBase from '../WidgetBase.svelte';
	import { IconBell } from '@tabler/icons-svelte';
	import Timeline from '$lib/components/Timeline.svelte';
	import getNotifications from '$lib/api/notifications/get.js';

	let query: any = $state();
</script>

<WidgetBase header tl>
	<svelte:fragment slot="header">
		<IconBell size="var(--fs-lg)" />
		Notifications
	</svelte:fragment>

	<Timeline
		type="notification"
		smallItems
		queryKey="notifications-widget"
		queryFn={getNotifications}
		bind:query
	/>
</WidgetBase>
