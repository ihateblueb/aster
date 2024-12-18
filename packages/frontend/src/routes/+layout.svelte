<script lang="ts">
	import PageSidebar from '$lib/components/PageSidebar.svelte';
	import queryClient from '$lib/queryclient';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { page } from '$app/stores';
	import localstore from '$lib/localstore';
	import store from '$lib/store';

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

	let showCompose = false;
	store.showCompose.subscribe((e) => {
		showCompose = e;
	});
</script>

<QueryClientProvider client={queryClient}>
	<!-- todo: modal shown on store change -->

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
