<script lang="ts">
	import WidgetBase from '../WidgetBase.svelte';
	import { IconBell, IconTrash } from '@tabler/icons-svelte';
	import Timeline from '$lib/components/Timeline.svelte';
	import getNotifications from '$lib/api/notifications/get.js';
	import Compose from '$lib/components/Compose.svelte';
	import LocalizedString from '$lib/components/LocalizedString.svelte';

	let query: any = $state();
</script>

<div class="box">
	<WidgetBase header tl>
		<svelte:fragment slot="header">
			<IconBell size="18px" />
			<LocalizedString id="notifications" />
		</svelte:fragment>

		<Timeline
			type="notification"
			smallItems
			queryKey="notifications-widget"
			queryFn={getNotifications}
			bind:query
		/>
	</WidgetBase>
</div>

<style lang="scss" scoped>
	@media (max-width: 1355px) {
		.box {
			display: none;
		}
	}
</style>
