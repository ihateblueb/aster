<script>
	import PageHeader from './PageHeader.svelte';
	// widgets
	import Account from './widgets/Account.svelte';
	import Clock from './widgets/Clock.svelte';
	import HardwareMetrics from './widgets/HardwareMetrics.svelte';
	import InstanceLogo from './widgets/InstanceLogo.svelte';
	import Navigation from './widgets/Navigation.svelte';
	import Notepad from './widgets/Notepad.svelte';
	import Notifications from './widgets/Notifications.svelte';
	import OnlineUsers from './widgets/OnlineUsers.svelte';
	import PostButton from './widgets/PostButton.svelte';
	import PostForm from './widgets/PostForm.svelte';

	let widgetsTop = [InstanceLogo];
	let widgetsMid = [Navigation];
	let widgetsBtm = [PostButton, Account];
</script>

<template>
	<div class="sidebar">
		<PageHeader title="Sidebar" />
		<div>
			<div>
				{#each widgetsTop as widget}
					<svelte:component this={widget} />
				{/each}
			</div>
			<div>
				{#each widgetsMid as widget}
					<svelte:component this={widget} />
				{/each}
			</div>
			<div>
				{#each widgetsBtm as widget}
					<svelte:component this={widget} />
				{/each}
			</div>
		</div>
	</div>
</template>

<style lang="scss">
	.sidebar {
		display: flex;
		flex-direction: column;
		height: 100vh;
		max-width: 375px;
		width: 300px;
		min-width: 200px;
	}
</style>
