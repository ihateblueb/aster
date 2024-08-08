<script>
	import { locale } from '$lib/locale';
	import { page } from '$app/stores';

	import Button from '$lib/components/Button.svelte';
	import Icon from '$lib/components/Icon.svelte';

	console.log('pathname ' + $page.url.pathname);

	function close() {
		document.getElementById('sidebar-left').classList.remove('open');
		document.getElementById('sidebar-right').classList.remove('open');
		document.getElementById('sidebar-out-left').classList.remove('open');
		document.getElementById('sidebar-out-right').classList.remove('open');
	}
</script>

<template>
	<Button
		type="nav {$page.url.pathname === '/' ? 'accent' : ''}"
		to="/"
		on:click={() => close()}
	>
		<Icon name="home" size="18px" margin="0px 6px 0px 0px" />
		{locale('home')}
	</Button>
	<hr />
	<Button
		type="nav {$page.url.pathname.startsWith('/explore') ? 'accent' : ''}"
		to="/explore"
		on:click={() => close()}
	>
		<Icon name="compass" size="18px" margin="0px 6px 0px 0px" />
		{locale('explore')}
	</Button>
	<Button
		type="nav {$page.url.pathname.startsWith('/announcements')
			? 'accent'
			: ''}"
		to="/announcements"
		on:click={() => close()}
	>
		<Icon name="speakerphone" size="18px" margin="0px 6px 0px 0px" />
		{locale('announcements')}
	</Button>
	<Button
		type="nav {$page.url.pathname.startsWith('/search') ? 'accent' : ''}"
		to="/search"
		on:click={() => close()}
	>
		<Icon name="search" size="18px" margin="0px 6px 0px 0px" />
		{locale('search')}
	</Button>
	<hr />
	<Button
		type="nav {$page.url.pathname.startsWith('/settings') ? 'accent' : ''}"
		to="/settings"
		on:click={() => close()}
	>
		<Icon name="settings" size="18px" margin="0px 6px 0px 0px" />
		{locale('settings')}
	</Button>
</template>

<style>
	hr {
		width: calc(100% - 16px);
		margin-left: 8px;
		margin-right: 8px;
		border: 0px solid;
		border-top: var(--border-width-s) solid var(--bg-accent);
	}
</style>
