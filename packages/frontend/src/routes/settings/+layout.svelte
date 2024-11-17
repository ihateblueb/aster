<script>
	import PageWrapper from '$lib/components/PageWrapper.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Tab from '$lib/components/Tab.svelte';
	import { IconSettings } from '@tabler/icons-svelte';
	import Button from '$lib/components/Button.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let selectedTab = 0;

	if ($page.route.id?.startsWith('/settings/account')) selectedTab = 1;
</script>

<PageHeader title="Settings">
	<svelte:fragment slot="icon">
		<IconSettings size="var(--fs-lg)" />
	</svelte:fragment>
	<Tab
		selected={selectedTab === 0}
		on:click={() => {
			selectedTab = 0;
			goto('/settings');
		}}
		title="Client"
	></Tab>
	<Tab
		selected={selectedTab === 1}
		on:click={() => {
			selectedTab = 1;
			goto('/settings/account');
		}}
		title="Account"
	></Tab>
</PageHeader>

<PageWrapper>
	<div class="subheader">
		{#if selectedTab === 0}
			<Tab
				short
				selected={$page.route.id === '/settings'}
				on:click={() => {
					selectedTab = 0;
					goto('/settings');
				}}
				title="General"
			></Tab>
			<Tab
				short
				selected={$page.route.id === '/settings/themes'}
				on:click={() => {
					selectedTab = 0;
					goto('/settings/themes');
				}}
				title="Themes"
			></Tab>
			<Tab
				short
				selected={$page.route.id === '/settings/sounds'}
				on:click={() => {
					selectedTab = 0;
					goto('/settings/sounds');
				}}
				title="Sounds"
			></Tab>
		{:else}
			<Tab
				short
				selected={$page.route.id === '/settings/account'}
				on:click={() => {
					selectedTab = 1;
					goto('/settings/account');
				}}
				title="Account"
			></Tab>
			<Tab
				short
				selected={$page.route.id === '/settings/account/privacy'}
				on:click={() => {
					selectedTab = 1;
					goto('/settings/account/privacy');
				}}
				title="Privacy"
			></Tab>
			<Tab
				short
				selected={$page.route.id === '/settings/account/security'}
				on:click={() => {
					selectedTab = 1;
					goto('/settings/account/security');
				}}
				title="Security"
			></Tab>
		{/if}
	</div>
	<slot></slot>
</PageWrapper>

<style lang="scss" scoped>
	.subheader {
		display: flex;
		align-items: center;
		overflow-x: scroll;

		gap: 10px;
		height: 48px;
		padding: 0 16px;
		margin: -12px -16px;
		margin-bottom: 16px;

		background-color: var(--bg3-25);
	}
</style>
