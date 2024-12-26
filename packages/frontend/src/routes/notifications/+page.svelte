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
	import getTimeline from '$lib/api/timeline';
	import Note from '$lib/components/Note.svelte';
	import { createInfiniteQuery, createQuery } from '@tanstack/svelte-query';
	import Error from '$lib/components/Error.svelte';
	import Tab from '$lib/components/Tab.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import Button from '$lib/components/Button.svelte';
	import queryclient from '$lib/queryclient.js';
	import getNotifications from '$lib/api/notifications/get.js';
	import Notification from '$lib/components/Notification.svelte';
	let timeline: string;

	let localstoreTimeline = localstore.get('notificationsTab');
	if (localstoreTimeline) {
		timeline = localstoreTimeline;
	} else {
		timeline = '';
	}

	const query = createInfiniteQuery({
		queryKey: ['notifications'],
		retry: false,
		queryFn: async ({ pageParam }) =>
			await getNotifications(timeline, pageParam),
		initialPageParam: undefined,
		getNextPageParam: (lastPage) => {
			console.log('lastNote', lastPage.at(-1).createdAt);
			return lastPage ? lastPage.at(-1).createdAt : undefined;
		}
	});

	function updateTimeline(to: string) {
		timeline = to;
		localstore.set('notificationsTab', to);
		queryclient.clear();
		$query.refetch();
	}
</script>

<PageHeader title="Notifications">
	<svelte:fragment slot="icon">
		<IconBell size="var(--fs-lg)" />
	</svelte:fragment>

	<Tab selected={timeline === ''} on:click={() => updateTimeline('')}>
		<IconBell
			size="var(--fs-lg)"
			color={timeline === '' ? 'var(--ac1)' : 'var(--tx2)'}
		/>
	</Tab>
	<Tab
		selected={timeline === 'mentions'}
		on:click={() => updateTimeline('mentions')}
	>
		<IconAt
			size="var(--fs-lg)"
			color={timeline === 'mentions' ? 'var(--ac1)' : 'var(--tx2)'}
		/>
	</Tab>
	<Tab
		selected={timeline === 'direct'}
		on:click={() => updateTimeline('direct')}
	>
		<IconMail
			size="var(--fs-lg)"
			color={timeline === 'direct' ? 'var(--ac1)' : 'var(--tx2)'}
		/>
	</Tab>
</PageHeader>

<PageWrapper tl>
	{#if $query.isLoading}
		<Loading />
	{:else if $query.isError}
		<Error
			status={$query.error.status}
			message={$query.error.message}
			server={Boolean($query.error.status)}
			retry={() => $query.refetch()}
		/>
	{:else if $query.isSuccess}
		{#each $query.data.pages as results}
			{#each results as notification}
				<Notification {notification} />
			{/each}
		{/each}
		<Button
			on:click={() => $query.fetchNextPage()}
			disabled={!$query.hasNextPage || $query.isFetchingNextPage}
		>
			{#if $query.isFetching}
				Loading more...
			{:else if $query.hasNextPage}
				Load More
			{:else}
				Nothing more to load
			{/if}
		</Button>
	{/if}
</PageWrapper>
