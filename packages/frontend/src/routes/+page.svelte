<script lang="ts">
	import {
		IconChartBubble,
		IconHome,
		IconPlanet,
		IconUsers
	} from '@tabler/icons-svelte';

	import PageWrapper from '$lib/components/PageWrapper.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import IconWrapper from '$lib/components/IconWrapper.svelte';
	import Store from '$lib/store';
	import localstore from '$lib/localstore';
	import getTimeline from '$lib/api/timeline';
	import InlineError from '$lib/components/InlineError.svelte';

	let timeline: string;
	let notes = [];

	let localstoreTimeline = localstore.get('homeTab');
	if (localstoreTimeline) {
		updateTimeline(localstoreTimeline);
	} else {
		updateTimeline('home');
	}

	Store.viewRefresh.subscribe(async (e) => {
		if (e) {
			console.log(
				'timeline page caught viewRefresh store change to ' + e
			);

			notes = [];
			notes = await getTimeline(timeline);
			console.log(notes);

			Store.viewRefresh.set(false);
		}
	});

	function updateTimeline(to) {
		timeline = to;
		localstore.set('homeTab', to);
		Store.viewRefresh.set(true);
	}
</script>

{#key timeline}
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
		<IconWrapper on:click={() => updateTimeline('home')}>
			<IconHome
				size="var(--fs-lg)"
				color={timeline === 'home' ? 'var(--ac1)' : 'var(--tx1)'}
			/>
		</IconWrapper>
		<IconWrapper on:click={() => updateTimeline('local')}>
			<IconUsers
				size="var(--fs-lg)"
				color={timeline === 'local' ? 'var(--ac1)' : 'var(--tx1)'}
			/>
		</IconWrapper>
		<IconWrapper on:click={() => updateTimeline('bubble')}>
			<IconChartBubble
				size="var(--fs-lg)"
				color={timeline === 'bubble' ? 'var(--ac1)' : 'var(--tx1)'}
			/>
		</IconWrapper>
		<IconWrapper on:click={() => updateTimeline('public')}>
			<IconPlanet
				size="var(--fs-lg)"
				color={timeline === 'public' ? 'var(--ac1)' : 'var(--tx1)'}
			/>
		</IconWrapper>
	</PageHeader>
{/key}

<PageWrapper>
	{#key notes}
		{#if notes}
			{#if notes.status !== 200}
				<InlineError>
					<h1>{notes.status}</h1>
					<h2>
						{notes.res
							? notes.res.message
								? notes.res.message
								: ''
							: ''}
					</h2>
				</InlineError>
			{:else}
				{JSON.stringify(notes.res)}
			{/if}
		{:else}
			<p>No returned notes</p>
		{/if}
	{/key}
</PageWrapper>
