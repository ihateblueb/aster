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

	let timeline: String = 'home';

	Store.viewRefresh.subscribe((e) => {
		if (e) {
			console.log(
				'timeline page caught viewRefresh store change to ' + e
			);
			Store.viewRefresh.set(false);
		}
	});

	function updateTimeline(to: String) {
		timeline = to;
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
	<p>Work in progress Aster client</p>
</PageWrapper>
