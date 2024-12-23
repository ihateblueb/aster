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

	let loggedIn = false;
	if (localstore.get('token')) loggedIn = true;

	let compose: Modal;

	// todo: this doesnt get toggled off when the modal closes
	store.showCompose.subscribe((e) => {
		if (e) compose.open();
	});
</script>

<QueryClientProvider client={queryClient}>
	{#if loggedIn}
		<Modal bind:this={compose}>
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
</style>
