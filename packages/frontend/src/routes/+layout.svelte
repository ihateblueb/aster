<script lang="ts">
	import PageSidebar from '$lib/components/PageSidebar.svelte';
	import queryClient from '$lib/queryclient';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { page } from '$app/stores';
	import localstore from '$lib/localstore';
	import store from '$lib/store';
	import Modal from '$lib/components/Modal.svelte';
	import Compose from '$lib/components/Compose.svelte';

	let loggedIn = false;
	if (localstore.get('token')) loggedIn = true;

	let showPage = true;
	if (
		!loggedIn &&
		($page.url.pathname === '/' || $page.url.pathname === '/settings')
	)
		showPage = false;

	let showWelcome = false;
	if (!loggedIn && $page.url.pathname === '/') showWelcome = true;

	let compose: Modal;

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

	<main>
		{#if showPage}
			<slot />
		{/if}
		{#if showWelcome}
			Welcome in progress
		{/if}
	</main>

	{#if loggedIn}
		<PageSidebar right />
	{/if}
</QueryClientProvider>

<style lang="scss" global>
	@use '../app.scss';
</style>
