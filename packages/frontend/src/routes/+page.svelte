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
	import { createInfiniteQuery, createQuery } from '@tanstack/svelte-query';
	import Error from '$lib/components/Error.svelte';
	import Tab from '$lib/components/Tab.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import Button from '$lib/components/Button.svelte';
	import queryclient from '$lib/queryclient';
	import store from '$lib/store';
	import { getContext } from 'svelte';
	import Timeline from '$lib/components/Timeline.svelte';

	let query: any = $state();

	let timeline: string = $state('home');
	timeline = localstore.get('homeTab');

	let ws: undefined | WebSocket = $state();
	store.websocket.subscribe((e) => {
		if (e) ws = e;
	});

	let additionalNotes: any[] = $state([]);

	if (ws) {
		ws.send(`sub timeline:${timeline}`);

		ws.onmessage = (e) => {
			let message;
			try {
				message = JSON.parse(e.data);
			} catch {}

			if (
				message &&
				message.type === 'timeline:add' &&
				message.timeline === timeline &&
				message.note
			) {
				console.log('[timeline] received ws note');
				additionalNotes.unshift(message.note);
			}
		};
	}

	function updateTimeline(to: string) {
		if (ws) ws.send(`unsub timeline:${timeline}`);
		timeline = to;
		if (ws) ws.send(`sub timeline:${timeline}`);
		localstore.set('homeTab', to);

		// clear timeline
		additionalNotes = [];
		queryclient.clear();
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
	<Timeline
		type="note"
		queryKey="timeline"
		queryFn={getTimeline}
		bind:timeline
		bind:query
	/>
</PageWrapper>
