<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import {
		IconBell,
		IconBookmark,
		IconCloud,
		IconDashboard,
		IconHash,
		IconHome,
		IconSearch,
		IconSettings,
		IconTrash,
		IconUserPlus
	} from '@tabler/icons-svelte';
	import { page } from '$app/state';
	import LocalizedString from '$lib/components/LocalizedString.svelte';

	let innerWidth: number;
</script>

<svelte:window bind:innerWidth />

{#key page.url.pathname}
	{#if innerWidth > 1355}
		<div class="navBtns">
			<Button
				accentLight={page.url.pathname === '/'}
				transparent={page.url.pathname !== '/'}
				wide
				nm
				to="/"
			>
				<IconHome size="18px" />
				<LocalizedString id="home" />
			</Button>
			<Button
				accentLight={page.url.pathname === '/notifications'}
				transparent={page.url.pathname !== '/notifications'}
				wide
				nm
				to="/notifications"
			>
				<IconBell size="18px" />
				<LocalizedString id="notifications" />
			</Button>
			<Button
				accentLight={page.url.pathname === '/follow-requests'}
				transparent={page.url.pathname !== '/follow-requests'}
				wide
				nm
				to="/follow-requests"
			>
				<IconUserPlus size="18px" />
				<LocalizedString id="follow-requests" />
			</Button>
			<hr />
			<Button
				accentLight={page.url.pathname === '/search'}
				transparent={page.url.pathname !== '/search'}
				wide
				nm
				to="/search"
			>
				<IconSearch size="18px" />
				<LocalizedString id="search" />
			</Button>
			<Button
				accentLight={page.url.pathname === '/explore'}
				transparent={page.url.pathname !== '/explore'}
				wide
				nm
				to="/explore"
			>
				<IconHash size="18px" />
				<LocalizedString id="explore" />
			</Button>
			<hr />
			<Button
				accentLight={page.url.pathname === '/drive'}
				transparent={page.url.pathname !== '/drive'}
				wide
				nm
				to="/drive"
			>
				<IconCloud size="18px" />
				<LocalizedString id="drive" />
			</Button>
			<Button
				accentLight={page.url.pathname === '/bookmarks'}
				transparent={page.url.pathname !== '/bookmarks'}
				wide
				nm
				to="/bookmarks"
			>
				<IconBookmark size="18px" />
				<LocalizedString id="bookmarks" />
			</Button>
			<hr />
			<Button
				accentLight={page.url.pathname.startsWith('/settings')}
				transparent={!page.url.pathname.startsWith('/settings')}
				wide
				nm
				to="/settings"
			>
				<IconSettings size="18px" />
				<LocalizedString id="settings" />
			</Button>
			<Button
				accentLight={page.url.pathname.startsWith('/admin')}
				transparent={!page.url.pathname.startsWith('/admin')}
				wide
				nm
				to="/admin"
			>
				<IconDashboard size="18px" />
				<LocalizedString id="dashboard" />
			</Button>
		</div>
	{:else}
		<div class="navBtns thin">
			<Button
				circle
				accentLight={page.url.pathname === '/'}
				transparent={page.url.pathname !== '/'}
				nm
				to="/"
			>
				<IconHome size="18px" />
			</Button>
			<Button
				circle
				accentLight={page.url.pathname === '/notifications'}
				transparent={page.url.pathname !== '/notifications'}
				nm
				to="/notifications"
			>
				<IconBell size="18px" />
			</Button>
			<Button
				circle
				accentLight={page.url.pathname === '/follow-requests'}
				transparent={page.url.pathname !== '/follow-requests'}
				nm
				to="/follow-requests"
			>
				<IconUserPlus size="18px" />
			</Button>
			<hr />
			<Button
				circle
				accentLight={page.url.pathname === '/search'}
				transparent={page.url.pathname !== '/search'}
				nm
				to="/search"
			>
				<IconSearch size="18px" />
			</Button>
			<Button
				circle
				accentLight={page.url.pathname === '/explore'}
				transparent={page.url.pathname !== '/explore'}
				nm
				to="/explore"
			>
				<IconHash size="18px" />
			</Button>
			<hr />
			<Button
				circle
				accentLight={page.url.pathname === '/drive'}
				transparent={page.url.pathname !== '/drive'}
				nm
				to="/drive"
			>
				<IconCloud size="18px" />
			</Button>
			<Button
				circle
				accentLight={page.url.pathname === '/bookmarks'}
				transparent={page.url.pathname !== '/bookmarks'}
				nm
				to="/bookmarks"
			>
				<IconBookmark size="18px" />
			</Button>
			<hr />
			<Button
				circle
				accentLight={page.url.pathname.startsWith('/settings')}
				transparent={!page.url.pathname.startsWith('/settings')}
				nm
				to="/settings"
			>
				<IconSettings size="18px" />
			</Button>
			<Button
				circle
				accentLight={page.url.pathname.startsWith('/admin')}
				transparent={!page.url.pathname.startsWith('/admin')}
				nm
				to="/admin"
			>
				<IconDashboard size="18px" />
			</Button>
		</div>
	{/if}
{/key}

<style lang="scss" scoped>
	hr {
		width: calc(100% - 16px);
		margin-left: 8px;
		margin-right: 8px;

		border: 0 solid;
		border-top: 1px solid var(--bg3);
	}

	.navBtns {
		display: flex;
		flex-direction: column;
		padding: 12px;
		gap: 4px;

		&.thin {
			padding: 0;
		}
	}
</style>
