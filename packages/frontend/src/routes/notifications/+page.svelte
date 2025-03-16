<script lang="ts">
	import {
		IconAt,
		IconBell,
		IconChartBubble,
		IconHome,
		IconMail,
		IconPlanet,
		IconUsers
	} from '@tabler/icons-svelte';

	import PageWrapper from '$lib/components/PageWrapper.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import localstore from '$lib/localstore';
	import Tab from '$lib/components/Tab.svelte';
	import queryclient from '$lib/queryclient.js';
	import getNotifications from '$lib/api/notifications/get.js';
	import Timeline from '$lib/components/Timeline.svelte';

	let query: any = $state();

	let timeline: string = $state('');
	timeline = localstore.getParsed('notificationsTab');

	function updateTimeline(to: string) {
		timeline = to;
		localstore.set('notificationsTab', to);
		queryclient.clear();
		$query.refetch();
	}
</script>

<PageHeader title="Notifications">
	<svelte:fragment slot="icon">
		<IconBell size="18px" />
	</svelte:fragment>

	<Tab selected={timeline === ''} on:click={() => updateTimeline('')}>
		<IconBell
			size="18px"
			color={timeline === '' ? 'var(--ac1)' : 'var(--tx2)'}
		/>
	</Tab>
	<Tab
		selected={timeline === 'mentions'}
		on:click={() => updateTimeline('mentions')}
	>
		<IconAt
			size="18px"
			color={timeline === 'mentions' ? 'var(--ac1)' : 'var(--tx2)'}
		/>
	</Tab>
	<Tab
		selected={timeline === 'direct'}
		on:click={() => updateTimeline('direct')}
	>
		<IconMail
			size="18px"
			color={timeline === 'direct' ? 'var(--ac1)' : 'var(--tx2)'}
		/>
	</Tab>
</PageHeader>

<PageWrapper tl>
	<Timeline
		type="notification"
		queryKey="notifications"
		queryFn={getNotifications}
		bind:timeline
		bind:query
	/>
</PageWrapper>
