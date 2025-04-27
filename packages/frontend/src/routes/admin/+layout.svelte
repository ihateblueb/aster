<script>
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { IconDashboard, IconSettings } from '@tabler/icons-svelte';
	import Tab from '$lib/components/Tab.svelte';
	import localizedString from '$lib/localizedString';
	import PageWrapper from '$lib/components/PageWrapper.svelte';

	let selectedTab = 0;
	if (page.route.id?.startsWith('/admin/settings')) selectedTab = 1;
	if (page.route.id?.startsWith('/admin/moderation')) selectedTab = 2;
</script>

<PageHeader title={localizedString('dashboard')}>
	<svelte:fragment slot="icon">
		<IconDashboard size="18px" />
	</svelte:fragment>
	<Tab
		selected={selectedTab === 0}
		on:click={() => {
			selectedTab = 0;
			goto('/admin');
		}}
		title="Overview"
	></Tab>
	<Tab
		selected={selectedTab === 1}
		on:click={() => {
			selectedTab = 1;
			goto('/admin/settings');
		}}
		title="Settings"
	></Tab>
	<Tab
		selected={selectedTab === 2}
		on:click={() => {
			selectedTab = 2;
			goto('/admin/moderation');
		}}
		title="Moderation"
	></Tab>
</PageHeader>

<PageWrapper>
	<div class="subheader">
		{#if selectedTab === 1}
			<Tab
				selected={page.route.id === '/admin/settings'}
				on:click={() => {
					selectedTab = 0;
					goto('/admin/settings');
				}}
				title={localizedString('general')}
			></Tab>
			<Tab
				selected={page.route.id === '/admin/settings/emoji'}
				on:click={() => {
					selectedTab = 0;
					goto('/admin/settings/emoji');
				}}
				title={localizedString('emoji')}
			></Tab>
		{:else if selectedTab === 2}
			<Tab
				selected={page.route.id === '/admin/settings/users'}
				on:click={() => {
					selectedTab = 0;
					goto('/admin/settings/users');
				}}
				title={localizedString('users')}
			></Tab>
			<Tab
				selected={page.route.id === '/admin/settings/invites'}
				on:click={() => {
					selectedTab = 0;
					goto('/admin/settings/invites');
				}}
				title={localizedString('invites')}
			></Tab>
			<Tab
				selected={page.route.id === '/admin/settings/rules'}
				on:click={() => {
					selectedTab = 0;
					goto('/admin/settings/rules');
				}}
				title={localizedString('rules')}
			></Tab>
			<Tab
				selected={page.route.id === '/admin/settings/policies'}
				on:click={() => {
					selectedTab = 0;
					goto('/admin/settings/policies');
				}}
				title={localizedString('policies')}
			></Tab>
			<Tab
				selected={page.route.id === '/admin/settings/reports'}
				on:click={() => {
					selectedTab = 0;
					goto('/admin/settings/reports');
				}}
				title={localizedString('reports')}
			></Tab>
		{/if}
	</div>
	<div class="body">
		<slot></slot>
	</div>
</PageWrapper>

<style lang="scss" scoped>
	.subheader {
		display: flex;
		align-items: center;
		overflow-x: auto;

		gap: 8px;
		height: 50px;
		padding: 0 18px;
		margin: -12px;
		margin-bottom: 12px;

		border-bottom: 1px solid var(--bg3);
	}

	.body {
		padding: 6px;
	}
</style>
