<script lang="ts">
	import translations from '$lib/translations';

	console.log('ftl translations', translations._messages);

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
	import Notification from '$lib/components/Notification.svelte';
	import { shortcut } from '@svelte-put/shortcut';
	import Drive from '$lib/components/Drive.svelte';
	import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';
	import Boundary from '$lib/components/Boundary.svelte';
	import ws from '$lib/websocket.svelte.js';
	import addAlert from '$lib/addAlert.js';

	let loggedIn = $state(false);
	if (localstore.getParsed('token')) loggedIn = true;

	let compose: undefined | Modal = $state(undefined);
	let drive: undefined | Modal = $state(undefined);

	let activeRequests = $state(0);
	store.activeRequests.subscribe((e) => {
		activeRequests = e;
	});

	let alerts: any = $state([]);
	store.alerts.subscribe((e) => {
		alerts = e;
	});

	store.showCompose.subscribe(async (e) => {
		if (e && compose && loggedIn) await compose.open();
		if (!e && compose) compose.close();
	});
	store.showDrive.subscribe(async (e) => {
		if (e && drive && loggedIn) await drive.open();
		if (!e && drive) drive.close();
	});

	if (ws) {
		ws.addEventListener('message', (e) => {
			let message;
			try {
				message = JSON.parse(e.data);
			} catch {}

			let addToNotifs =
				message &&
				message.type === 'notification:add' &&
				message.notification;

			if (addToNotifs) addAlert(message.notification, true);
		});
	}

	function onShortcut(event) {
		const keyboardEvent = event.detail.originalEvent;

		if (
			(keyboardEvent.target as HTMLElement)?.tagName === 'INPUT' ||
			(keyboardEvent.target as HTMLElement)?.tagName === 'TEXTAREA'
		) {
			return;
		}

		console.log(keyboardEvent);

		// p
		if (keyboardEvent.key === 'p') {
			console.log('[keys] p');
			store.showCompose.set(true);
		}
	}
</script>

<svelte:window
	use:shortcut={{
		trigger: [
			{
				key: 'p',
				modifier: undefined
			}
		]
	}}
	onshortcut={onShortcut}
/>

<Boundary>
	<QueryClientProvider client={queryClient}>
		<div class="notifications">
			{#each alerts as notification}
				<Notification {notification} floating />
			{/each}
		</div>

		<SvelteQueryDevtools />

		{#if activeRequests > 0}
			<div class="activeRequests">
				<Loading size="24px" color="var(--ac1)" massive={false} />
			</div>
		{/if}

		{#if loggedIn}
			<Modal
				wide
				singleSlot
				smallerPadding
				afterClose={() => store.showDrive.set(false)}
				bind:this={drive}
			>
				<Drive />
			</Modal>
			<Modal
				wide
				singleSlot
				afterClose={() => store.showCompose.set(false)}
				bind:this={compose}
			>
				<Compose />
			</Modal>
		{/if}

		<!-- main ui -->

		<Boundary>
			{#if loggedIn}
				<PageSidebar left />
			{/if}
		</Boundary>

		<Boundary>
			{#if loggedIn || !(page.url.pathname === '/')}
				<main>
					<Boundary>
						<slot />
					</Boundary>
				</main>
			{:else if !loggedIn && page.url.pathname === '/'}
				<Welcome />
			{/if}
		</Boundary>

		<Boundary>
			{#if loggedIn}
				<PageSidebar right />
			{/if}
		</Boundary>
	</QueryClientProvider>
</Boundary>

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

		z-index: 1000;
		padding: 12px;
	}
</style>
