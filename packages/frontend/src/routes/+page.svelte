<script lang="ts">
	import {
		IconBox,
		IconChartBubble,
		IconCheckbox,
		IconDotsVertical,
		IconHome,
		IconPlanet,
		IconReload,
		IconToggleLeft,
		IconUsers
	} from '@tabler/icons-svelte';
	import translations from '$lib/translations';

	import PageWrapper from '$lib/components/PageWrapper.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import localstore from '$lib/localstore';
	import getTimeline from '$lib/api/timeline';
	import Tab from '$lib/components/Tab.svelte';
	import Button from '$lib/components/Button.svelte';
	import queryclient from '$lib/queryclient';
	import Timeline from '$lib/components/Timeline.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import DropdownItem from '$lib/components/DropdownItem.svelte';
	import ws from '$lib/websocket.svelte';
	import DropdownDivider from '$lib/components/DropdownDivider.svelte';
	import LocalizedString from '$lib/components/LocalizedString.svelte';

	const defaultAdditionalState = { notes: [] };

	let query: any = $state();
	let additional: any = $state(defaultAdditionalState);

	let timeline: string = $state('home');
	timeline = localstore.getParsed('homeTab');

	function updateTimeline(to: string) {
		if (ws) ws.send(`unsub timeline:${timeline}`);
		timeline = to;
		if (ws) ws.send(`sub timeline:${timeline}`);
		localstore.set('homeTab', to);
		additional = defaultAdditionalState;
		queryclient.clear();
		$query.refetch();
	}

	let dropdown: Dropdown;
</script>

<PageHeader
	title={timeline === 'home'
		? translations.getMessage('home')?.value
		: timeline === 'local'
			? translations.getMessage('local')?.value
			: timeline === 'bubble'
				? translations.getMessage('bubble')?.value
				: timeline === 'public'
					? translations.getMessage('public')?.value
					: 'Unknown'}
>
	<svelte:fragment slot="icon">
		{#if timeline === 'home'}
			<IconHome size="18px" />
		{:else if timeline === 'local'}
			<IconUsers size="18px" />
		{:else if timeline === 'bubble'}
			<IconChartBubble size="18px" />
		{:else if timeline === 'public'}
			<IconPlanet size="18px" />
		{/if}
	</svelte:fragment>
	<Tab selected={timeline === 'home'} on:click={() => updateTimeline('home')}>
		<IconHome
			size="18px"
			color={timeline === 'home' ? 'var(--ac1)' : 'var(--tx2)'}
		/>
	</Tab>
	<Tab
		selected={timeline === 'local'}
		on:click={() => updateTimeline('local')}
	>
		<IconUsers
			size="18px"
			color={timeline === 'local' ? 'var(--ac1)' : 'var(--tx2)'}
		/>
	</Tab>
	<Tab
		selected={timeline === 'bubble'}
		on:click={() => updateTimeline('bubble')}
	>
		<IconChartBubble
			size="18px"
			color={timeline === 'bubble' ? 'var(--ac1)' : 'var(--tx2)'}
		/>
	</Tab>
	<Tab
		selected={timeline === 'public'}
		on:click={() => updateTimeline('public')}
	>
		<IconPlanet
			size="18px"
			color={timeline === 'public' ? 'var(--ac1)' : 'var(--tx2)'}
		/>
	</Tab>
	<hr class="vertical" />
	<Button header on:click={(e) => dropdown.open(e)}>
		<IconDotsVertical size="18px" />
	</Button>
</PageHeader>

<PageWrapper tl>
	<Timeline
		type="note"
		queryKey="timeline"
		queryFn={getTimeline}
		bind:timeline
		bind:query
		bind:additional
	/>
</PageWrapper>

<Dropdown bind:this={dropdown}>
	<DropdownItem on:click={() => $query.refetch()}>
		<IconReload size="18px" />
		<LocalizedString id="refresh-timeline" />
	</DropdownItem>
</Dropdown>
