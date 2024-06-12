<script>
	import { locale } from '$lib/locale';

	import Button from '$lib/components/Button.svelte';
	import Icon from '$lib/components/Icon.svelte';
</script>

<template>
	<Button type="nav" to="/">
		<Icon name="home" size="18px" margin="0px 6px 0px 0px" />
		{locale('nav_home')}
	</Button>
	<Button type="nav" to="/notifications">
		<Icon name="bell" size="18px" margin="0px 6px 0px 0px" />
		{locale('nav_notifications')}
	</Button>
	<Button type="nav" to="/followrequests">
		<Icon name="user-plus" size="18px" margin="0px 6px 0px 0px" />
		{locale('nav_followrequests')}
	</Button>
	<hr />
	<Button type="nav" to="/explore">
		<Icon name="compass" size="18px" margin="0px 6px 0px 0px" />
		{locale('nav_explore')}
	</Button>
	<Button type="nav" to="/announcements">
		<Icon name="speakerphone" size="18px" margin="0px 6px 0px 0px" />
		{locale('nav_announcements')}
	</Button>
	<Button type="nav" to="/search">
		<Icon name="search" size="18px" margin="0px 6px 0px 0px" />
		{locale('nav_search')}
	</Button>
	<hr />
	<Button type="nav" to="/bookmarks">
		<Icon name="bookmarks" size="18px" margin="0px 6px 0px 0px" />
		{locale('nav_bookmarks')}
	</Button>
	<Button type="nav" to="/drive">
		<Icon name="folder" size="18px" margin="0px 6px 0px 0px" />
		{locale('nav_drive')}
	</Button>
	<Button type="nav" to="/drafts">
		<Icon name="pencil-minus" size="18px" margin="0px 6px 0px 0px" />
		{locale('nav_drafts')}
	</Button>
	<hr />
	<Button type="nav" to="/admin">
		<Icon name="dashboard" size="18px" margin="0px 6px 0px 0px" />
		{locale('nav_adminpanel')}
	</Button>
	<Button type="nav" to="/settings">
		<Icon name="settings" size="18px" margin="0px 6px 0px 0px" />
		{locale('nav_settings')}
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
