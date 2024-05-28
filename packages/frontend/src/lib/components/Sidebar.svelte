<script>
	import PageHeader from './PageHeader.svelte';
	import Store from '$lib/scripts/Store';
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

	import Login from './widgets/unauthenticated/Login.svelte';
	import Welcome from './widgets/unauthenticated/Welcome.svelte';

	export let side = 'left';
	export let auth = false;

	if (auth) {
		if (side === 'left') {
			let widgetsLeftTop = Store.get('widgetsLeftTop');
			let widgetsLeftMid = Store.get('widgetsLeftTop');
			let widgetsLeftBtm = Store.get('widgetsLeftBtm');

			if (widgetsLeftTop) {
				JSON.parse(widgetsLeftTop).forEach((element) => {
					console.log(element);
				});
			}
			if (widgetsLeftMid) {
				JSON.parse(widgetsLeftMid).forEach((element) => {
					console.log(element);
				});
			}
			if (widgetsLeftBtm) {
				JSON.parse(widgetsLeftBtm).forEach((element) => {
					console.log(element);
				});
			}
		} else if (side === 'right') {
			let widgetsRightTop = Store.get('widgetsRightTop');
			let widgetsRightMid = Store.get('widgetsRightTop');
			let widgetsRightBtm = Store.get('widgetsRightBtm');

			if (widgetsRightTop) {
				JSON.parse(widgetsRightTop).forEach((element) => {
					console.log(element);
				});
			}
			if (widgetsRightMid) {
				JSON.parse(widgetsRightMid).forEach((element) => {
					console.log(element);
				});
			}
			if (widgetsRightBtm) {
				JSON.parse(widgetsRightBtm).forEach((element) => {
					console.log(element);
				});
			}
		}
	} else {
		if (side === 'left') {
			var widgetsTop = [InstanceLogo];
			var widgetsMid = [Navigation];
			var widgetsBtm = [Login];
		} else if (side === 'right') {
			var widgetsTop = [Welcome];
		}
	}
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
