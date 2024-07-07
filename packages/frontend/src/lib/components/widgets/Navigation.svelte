<script>
	import { locale } from '$lib/locale';
	import { page } from '$app/stores';

	import Button from '$lib/components/Button.svelte';
	import Icon from '$lib/components/Icon.svelte';

	console.log('pathname ' + $page.url.pathname);
</script>

<template>
	<Button type="nav {$page.url.pathname === '/' ? 'accent' : ''}" to="/">
		<Icon name="home" size="18px" margin="0px 6px 0px 0px" />
		{locale('home')}
	</Button>
	<Button
		type="nav {$page.url.pathname === '/notifications' ? 'accent' : ''}"
		to="/notifications"
	>
		<Icon name="bell" size="18px" margin="0px 6px 0px 0px" />
		{locale('notifications')}
	</Button>
	<Button
		type="nav {$page.url.pathname === '/followrequests' ? 'accent' : ''}"
		to="/followrequests"
	>
		<Icon name="user-plus" size="18px" margin="0px 6px 0px 0px" />
		{locale('follow_requests')}
	</Button>
	<hr />
	<Button
		type="nav {$page.url.pathname === '/explore' ? 'accent' : ''}"
		to="/explore"
	>
		<Icon name="compass" size="18px" margin="0px 6px 0px 0px" />
		{locale('explore')}
	</Button>
	<Button
		type="nav {$page.url.pathname === '/announcements' ? 'accent' : ''}"
		to="/announcements"
	>
		<Icon name="speakerphone" size="18px" margin="0px 6px 0px 0px" />
		{locale('announcements')}
	</Button>
	<Button
		type="nav {$page.url.pathname === '/search' ? 'accent' : ''}"
		to="/search"
	>
		<Icon name="search" size="18px" margin="0px 6px 0px 0px" />
		{locale('search')}
	</Button>
	<hr />
	<Button
		type="nav {$page.url.pathname === '/bookmarks' ? 'accent' : ''}"
		to="/bookmarks"
	>
		<Icon name="bookmarks" size="18px" margin="0px 6px 0px 0px" />
		{locale('bookmarks')}
	</Button>
	<Button
		type="nav {$page.url.pathname === '/drive' ? 'accent' : ''}"
		to="/drive"
	>
		<Icon name="folder" size="18px" margin="0px 6px 0px 0px" />
		{locale('drive')}
	</Button>
	<Button
		type="nav {$page.url.pathname === '/drafts' ? 'accent' : ''}"
		to="/drafts"
	>
		<Icon name="pencil-minus" size="18px" margin="0px 6px 0px 0px" />
		{locale('drafts')}
	</Button>
	<hr />
	<Button
		type="nav {$page.url.pathname === '/admin' ? 'accent' : ''}"
		to="/admin"
	>
		<Icon name="dashboard" size="18px" margin="0px 6px 0px 0px" />
		{locale('admin_panel')}
	</Button>
	<Button
		type="nav {$page.url.pathname === '/settings' ? 'accent' : ''}"
		to="/settings"
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
