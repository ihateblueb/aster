<script lang="ts">
	import WidgetBase from '../WidgetBase.svelte';
	import { IconBell } from '@tabler/icons-svelte';
</script>

<WidgetBase header>
	<svelte:fragment slot="header">
		<IconBell size="var(--fs-lg)" />
		Notifications
	</svelte:fragment>

	notifications body
</WidgetBase>
