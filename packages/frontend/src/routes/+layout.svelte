<script lang="ts">
	import PageSidebar from '$lib/components/PageSidebar.svelte';
	import queryClient from '$lib/queryclient';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { page } from '$app/stores';
	import localstore from '$lib/localstore';
	import store from '$lib/store';
	import Modal from '$lib/components/Modal.svelte';
	import Compose from '$lib/components/Compose.svelte';
	import Welcome from '$lib/components/Welcome.svelte';
	import Loading from '$lib/components/Loading.svelte';

	let loggedIn = false;
	if (localstore.get('token')) loggedIn = true;

	let compose: Modal;

	let activeRequests = 0;
	store.activeRequests.subscribe((e) => {
		activeRequests = e;
	});

	store.showCompose.subscribe(async (e) => {
		if (e && loggedIn) await compose.open();
		if (!e && compose) compose.close();
	});

	if (loggedIn) {
		let ws = new WebSocket(
			$page.url.href + 'api/streaming?token=' + localstore.get('token')
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
					ws.send('sub timeline:public');
				}
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

	{#if loggedIn}
		<Modal wide compose bind:this={compose}>
			<Compose />
		</Modal>
	{/if}

	{#if loggedIn}
		<PageSidebar left />
	{/if}

	{#if loggedIn || !($page.url.pathname === '/')}
		<main>
			<slot />
		</main>
	{:else if !loggedIn && $page.url.pathname === '/'}
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
</style>
