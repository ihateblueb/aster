<script lang="ts">
	import PageHeader from './PageHeader.svelte';
	import Store from '$lib/utils/Store';

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
	import GuestNavigation from './widgets/unauthenticated/Navigation.svelte';

	export let widgets;
	export let side;

	let convertedWidgets = {
		top: [],
		mid: [],
		btm: []
	};

	function convertWidgets(e, section) {
		if (e === 'account') {
			convertedWidgets[section].push(Account);
		} else if (e === 'clock') {
			convertedWidgets[section].push(Clock);
		} else if (e === 'hardwaremetrics') {
			convertedWidgets[section].push(HardwareMetrics);
		} else if (e === 'instancelogo') {
			convertedWidgets[section].push(InstanceLogo);
		} else if (e === 'navigation') {
			convertedWidgets[section].push(Navigation);
		} else if (e === 'guestnavigation') {
			convertedWidgets[section].push(GuestNavigation);
		} else if (e === 'notepad') {
			convertedWidgets[section].push(Notepad);
		} else if (e === 'notifications') {
			convertedWidgets[section].push(Notifications);
		} else if (e === 'onlineusers') {
			convertedWidgets[section].push(OnlineUsers);
		} else if (e === 'postbutton') {
			convertedWidgets[section].push(PostButton);
		} else if (e === 'postform') {
			convertedWidgets[section].push(PostForm);
		} else if (e === 'login') {
			convertedWidgets[section].push(Login);
		} else if (e === 'welcome') {
			convertedWidgets[section].push(Welcome);
		}
	}

	if (widgets.top) {
		widgets.top.forEach((e) => {
			convertWidgets(e, 'top');
		});
	}
	if (widgets.mid) {
		widgets.mid.forEach((e) => {
			convertWidgets(e, 'mid');
		});
	}
	if (widgets.btm) {
		widgets.btm.forEach((e) => {
			convertWidgets(e, 'btm');
		});
	}

	function close() {
		document.getElementById('sidebar-' + side).classList.remove('open');
		document.getElementById('sidebar-out-' + side).classList.remove('open');
	}
</script>

<template>
	<div
		id={'sidebar-out-' + side}
		class="sidebar _39bP9NA out"
		on:click={() => close()}
	></div>
	<div id={'sidebar-' + side} class="sidebar _39bP9NA">
		<div class="top">
			{#each convertedWidgets.top as widget}
				<div class="widget">
					<svelte:component this={widget} />
				</div>
			{/each}
		</div>
		<div class="mid">
			{#each convertedWidgets.mid as widget}
				<div class="widget">
					<svelte:component this={widget} />
				</div>
			{/each}
		</div>
		<div class="btm">
			{#each convertedWidgets.btm as widget}
				<div class="widget">
					<svelte:component this={widget} />
				</div>
			{/each}
		</div>
	</div>
</template>
