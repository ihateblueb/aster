<script>
	import { locale } from '$lib/locale';

	import Button from '$lib/components/Button.svelte';
	import Icon from '$lib/components/Icon.svelte';
</script>

<template>
	<Button type="nav" to="/">
		<Icon name="home" size="18px" margin="0px 6px 0px 0px" />
		{locale('home')}
	</Button>
	<hr />
	<Button type="nav" to="/explore">
		<Icon name="compass" size="18px" margin="0px 6px 0px 0px" />
		{locale('explore')}
	</Button>
	<Button type="nav" to="/announcements">
		<Icon name="speakerphone" size="18px" margin="0px 6px 0px 0px" />
		{locale('announcements')}
	</Button>
	<Button type="nav" to="/search">
		<Icon name="search" size="18px" margin="0px 6px 0px 0px" />
		{locale('search')}
	</Button>
	<hr />
	<Button type="nav" to="/settings">
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
