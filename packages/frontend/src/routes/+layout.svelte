<script lang="ts">
	import * as uuid from 'uuid';
	import PageSidebar from '$lib/components/PageSidebar.svelte';
	import queryClient from '$lib/queryclient';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { page } from '$app/state';
	import localstore from '$lib/localstore';
	import store from '$lib/store';
	import Modal from '$lib/components/Modal.svelte';
	import Compose from '$lib/components/Compose.svelte';
	import Welcome from '$lib/components/Welcome.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import playSound from '$lib/sounds.js';
	import Notification from '$lib/components/Notification.svelte';

	let loggedIn = $state(false);
	if (localstore.get('token')) loggedIn = true;

	let compose: undefined | Modal = $state(undefined);

	let activeRequests = $state(0);
	store.activeRequests.subscribe((e) => {
		activeRequests = e;
	});

	store.showCompose.subscribe(async (e) => {
		if (e && compose && loggedIn) await compose.open();
		if (!e && compose) compose.close();
	});

	let notifications: any[] = $state([]);

	function addNotification(object: any) {
		if (!object.id) return;

		notifications.push(object);
		playSound('notification');

		setTimeout(() => {
			notifications = notifications.filter((e) => e.id !== object.id);
		}, 5000);
	}

	if (loggedIn) {
		let ws = new WebSocket(
			(page.url.protocol === 'https:' ? 'wss://' : 'ws://') +
				page.url.host +
				'/api/streaming?token=' +
				localstore.get('token')
		);

		ws.onopen = () => {
			console.log('[ws] opened');
			ws.send('ping');
			store.websocket.set(ws);
		};

		ws.onclose = () => {
			console.log('[ws] closed');
			store.websocket.set(undefined);
		};

		ws.onmessage = (e) => {
			console.log('[ws] server: ' + e.data);

			let message;
			try {
				message = JSON.parse(e.data);
			} catch {}

			if (message) {
				if (message.type === 'greet') {
					// connected, say something back!
					ws.send('sub timeline:home');
				} else if (message.type === 'notification:add') {
					addNotification(message.notification);
				}

				/*
				*  else if (message.type === 'echo') {
					addNotification({
						id: uuid.v4(),
						type: 'debug',
						note: { content: 'echo ' + message?.data }
					});
				}
				* */
			}
		};
	}
</script>

<QueryClientProvider client={queryClient}>
	{#if activeRequests > 0}
		<div class="activeRequests">
			<Loading size="24px" color="var(--ac1)" massive={false} />
		</div>
	{/if}

	<div class="notifications">
		{#each notifications as notification}
			<Notification {notification} floating />
		{/each}
	</div>

	{#if loggedIn}
		<Modal wide compose bind:this={compose}>
			<Compose />
		</Modal>
	{/if}

	<!-- main ui -->

	{#if loggedIn}
		<PageSidebar left />
	{/if}

	{#if loggedIn || !(page.url.pathname === '/')}
		<main>
			<slot />
		</main>
	{:else if !loggedIn && page.url.pathname === '/'}
		<Welcome />
	{/if}

	{#if loggedIn}
		<PageSidebar right />
	{/if}
</QueryClientProvider>

<style lang="scss" global>
	@use '../app.scss';

	.activeRequests {
		position: absolute;
		top: 0;
		right: 0;
	}

	.notifications {
		position: absolute;
		bottom: 0;
		right: 0;

		display: flex;
		flex-direction: column;
		gap: 6px;

		overflow: hidden;

		z-index: 10;
		padding: 12px;
	}
</style>
