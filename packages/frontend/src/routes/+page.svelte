<script lang="ts">
	import {
		IconChartBubble,
		IconHome,
		IconPlanet,
		IconUsers
	} from '@tabler/icons-svelte';

	import PageWrapper from '$lib/components/PageWrapper.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import localstore from '$lib/localstore';
	import getTimeline from '$lib/api/timeline';
	import Note from '$lib/components/Note.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import Error from '$lib/components/Error.svelte';
	import Tab from '$lib/components/Tab.svelte';
	import Loading from '$lib/components/Loading.svelte';
	let timeline: string;

	let localstoreTimeline = localstore.get('homeTab');
	if (localstoreTimeline) {
		timeline = localstoreTimeline;
	} else {
		timeline = 'home';
	}

	const query = createQuery({
		queryKey: ['timeline'],
		retry: false,
		queryFn: async () => await getTimeline(timeline)
	});

	function updateTimeline(to: string) {
		timeline = to;
		localstore.set('homeTab', to);
		$query.refetch();
	}
</script>

<PageHeader
	title={timeline === 'home'
		? 'Home'
		: timeline === 'local'
			? 'Local'
			: timeline === 'bubble'
				? 'Bubble'
				: timeline === 'public'
					? 'Public'
					: 'Unknown'}
>
	<svelte:fragment slot="icon">
		{#if timeline === 'home'}
			<IconHome size="var(--fs-lg)" />
		{:else if timeline === 'local'}
			<IconUsers size="var(--fs-lg)" />
		{:else if timeline === 'bubble'}
			<IconChartBubble size="var(--fs-lg)" />
		{:else if timeline === 'public'}
			<IconPlanet size="var(--fs-lg)" />
		{/if}
	</svelte:fragment>
	<Tab selected={timeline === 'home'} on:click={() => updateTimeline('home')}>
		<IconHome
			size="var(--fs-lg)"
			color={timeline === 'home' ? 'var(--ac1)' : 'var(--tx2)'}
		/>
	</Tab>
	<Tab
		selected={timeline === 'local'}
		on:click={() => updateTimeline('local')}
	>
		<IconUsers
			size="var(--fs-lg)"
			color={timeline === 'local' ? 'var(--ac1)' : 'var(--tx2)'}
		/>
	</Tab>
	<Tab
		selected={timeline === 'bubble'}
		on:click={() => updateTimeline('bubble')}
	>
		<IconChartBubble
			size="var(--fs-lg)"
			color={timeline === 'bubble' ? 'var(--ac1)' : 'var(--tx2)'}
		/>
	</Tab>
	<Tab
		selected={timeline === 'public'}
		on:click={() => updateTimeline('public')}
	>
		<IconPlanet
			size="var(--fs-lg)"
			color={timeline === 'public' ? 'var(--ac1)' : 'var(--tx2)'}
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
		{#each $query.data as note}
			<Note {note} />
		{/each}
	{/if}
</PageWrapper>
