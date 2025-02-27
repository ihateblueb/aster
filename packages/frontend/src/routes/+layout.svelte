<script lang="ts">
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
	import { shortcut } from '@svelte-put/shortcut';
	import Drive from '$lib/components/Drive.svelte';
	import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';

	let loggedIn = $state(false);
	if (localstore.get('token')) loggedIn = true;

	let compose: undefined | Modal = $state(undefined);
	let drive: undefined | Modal = $state(undefined);

	let activeRequests = $state(0);
	store.activeRequests.subscribe((e) => {
		activeRequests = e;
	});

	store.showCompose.subscribe(async (e) => {
		if (e && compose && loggedIn) await compose.open();
		if (!e && compose) compose.close();
	});
	store.showDrive.subscribe(async (e) => {
		if (e && drive && loggedIn) await drive.open();
		if (!e && drive) drive.close();
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

<QueryClientProvider client={queryClient}>
	<SvelteQueryDevtools />

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
