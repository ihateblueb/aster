<script>
	import { locale } from '$lib/locale';
	import { page } from '$app/stores';

	import Button from '$lib/components/Button.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import localstore from '$lib/utils/localstore';

	console.log('pathname ' + $page.url.pathname);

	function close() {
		document.getElementById('sidebar-left').classList.remove('open');
		document.getElementById('sidebar-right').classList.remove('open');
		document.getElementById('sidebar-out-left').classList.remove('open');
		document.getElementById('sidebar-out-right').classList.remove('open');
	}

	let account = localstore.get('account');

	if (account) {
		account = JSON.parse(account);
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
	<Button
		type="nav {$page.url.pathname.startsWith('/notifications')
			? 'accent'
			: ''}"
		to="/notifications"
		on:click={() => close()}
	>
		<Icon name="bell" size="18px" margin="0px 6px 0px 0px" />
		{locale('notifications')}
	</Button>
	<Button
		type="nav {$page.url.pathname.startsWith('/followrequests')
			? 'accent'
			: ''}"
		to="/followrequests"
		on:click={() => close()}
	>
		<Icon name="user-plus" size="18px" margin="0px 6px 0px 0px" />
		{locale('follow_requests')}
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
		type="nav {$page.url.pathname.startsWith('/bookmarks') ? 'accent' : ''}"
		to="/bookmarks"
		on:click={() => close()}
	>
		<Icon name="bookmarks" size="18px" margin="0px 6px 0px 0px" />
		{locale('bookmarks')}
	</Button>
	<Button
		type="nav {$page.url.pathname.startsWith('/drive') ? 'accent' : ''}"
		to="/drive"
		on:click={() => close()}
	>
		<Icon name="folder" size="18px" margin="0px 6px 0px 0px" />
		{locale('drive')}
	</Button>
	<Button
		type="nav {$page.url.pathname === '/drafts' ? 'accent' : ''}"
		to="/drafts"
		on:click={() => close()}
	>
		<Icon name="pencil-minus" size="18px" margin="0px 6px 0px 0px" />
		{locale('drafts')}
	</Button>
	<hr />
	{#if account.admin}
		<Button
			type="nav {$page.url.pathname.startsWith('/admin') ? 'accent' : ''}"
			to="/admin"
			on:click={() => close()}
		>
			<Icon name="dashboard" size="18px" margin="0px 6px 0px 0px" />
			{locale('admin_panel')}
		</Button>
	{/if}

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
