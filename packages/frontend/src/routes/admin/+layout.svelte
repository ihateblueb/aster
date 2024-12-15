<script>
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { IconDashboard, IconSettings } from '@tabler/icons-svelte';
	import Tab from '$lib/components/Tab.svelte';

	let selectedTab = 0;

	if ($page.route.id?.startsWith('/admin/general')) selectedTab = 1;
	if ($page.route.id?.startsWith('/admin/users')) selectedTab = 2;
	if ($page.route.id?.startsWith('/admin/rules')) selectedTab = 3;
	if ($page.route.id?.startsWith('/admin/reports')) selectedTab = 4;
</script>

<PageHeader title="Dashboard">
	<svelte:fragment slot="icon">
		<IconDashboard size="var(--fs-lg)" />
	</svelte:fragment>
	<Tab
		selected={selectedTab === 0}
		on:click={() => {
			selectedTab = 0;
			goto('/admin');
		}}
		title="Home"
	></Tab>
	<Tab
		selected={selectedTab === 1}
		on:click={() => {
			selectedTab = 1;
			goto('/admin/general');
		}}
		title="General"
	></Tab>
	<Tab
		selected={selectedTab === 2}
		on:click={() => {
			selectedTab = 2;
			goto('/admin/users');
		}}
		title="Users"
	></Tab>
	<Tab
		selected={selectedTab === 3}
		on:click={() => {
			selectedTab = 3;
			goto('/admin/rules');
		}}
		title="Rules"
	></Tab>
	<Tab
		selected={selectedTab === 4}
		on:click={() => {
			selectedTab = 4;
			goto('/admin/reports');
		}}
		title="Reports"
	></Tab>
</PageHeader>

<slot></slot>
