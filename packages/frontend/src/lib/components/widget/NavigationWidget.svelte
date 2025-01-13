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
		IconUserPlus
	} from '@tabler/icons-svelte';
	import { page } from '$app/state';

	let innerWidth: number;
</script>

<svelte:window bind:innerWidth />

{#if innerWidth > 1355}
	<div class="navBtns">
		<Button
			accentLight={page.url.pathname === '/'}
			transparent={page.url.pathname !== '/'}
			wide
			nm
			to="/"
		>
			<IconHome size="var(--fs-lg)" />
			Home
		</Button>
		<Button
			accentLight={page.url.pathname === '/notifications'}
			transparent={page.url.pathname !== '/notifications'}
			wide
			nm
			to="/notifications"
		>
			<IconBell size="var(--fs-lg)" />
			Notifications
		</Button>
		<Button
			accentLight={page.url.pathname === '/follow-requests'}
			transparent={page.url.pathname !== '/follow-requests'}
			wide
			nm
			to="/follow-requests"
		>
			<IconUserPlus size="var(--fs-lg)" />
			Follow requests
		</Button>
		<hr />
		<Button
			accentLight={page.url.pathname === '/search'}
			transparent={page.url.pathname !== '/search'}
			wide
			nm
			to="/search"
		>
			<IconSearch size="var(--fs-lg)" />
			Search
		</Button>
		<Button
			accentLight={page.url.pathname === '/explore'}
			transparent={page.url.pathname !== '/explore'}
			wide
			nm
			to="/explore"
		>
			<IconHash size="var(--fs-lg)" />
			Explore
		</Button>
		<hr />
		<Button
			accentLight={page.url.pathname === '/drive'}
			transparent={page.url.pathname !== '/drive'}
			wide
			nm
			to="/drive"
		>
			<IconCloud size="var(--fs-lg)" />
			Drive
		</Button>
		<Button
			accentLight={page.url.pathname === '/bookmarks'}
			transparent={page.url.pathname !== '/bookmarks'}
			wide
			nm
			to="/bookmarks"
		>
			<IconBookmark size="var(--fs-lg)" />
			Bookmarks
		</Button>
		<hr />
		<Button
			accentLight={page.url.pathname.startsWith('/settings')}
			transparent={!page.url.pathname.startsWith('/settings')}
			wide
			nm
			to="/settings"
		>
			<IconSettings size="var(--fs-lg)" />
			Settings
		</Button>
		<Button
			accentLight={page.url.pathname.startsWith('/admin')}
			transparent={!page.url.pathname.startsWith('/admin')}
			wide
			nm
			to="/admin"
		>
			<IconDashboard size="var(--fs-lg)" />
			Dashboard
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
			<IconHome size="var(--fs-lg)" />
		</Button>
		<Button
			circle
			accentLight={page.url.pathname === '/notifications'}
			transparent={page.url.pathname !== '/notifications'}
			nm
			to="/notifications"
		>
			<IconBell size="var(--fs-lg)" />
		</Button>
		<Button
			circle
			accentLight={page.url.pathname === '/follow-requests'}
			transparent={page.url.pathname !== '/follow-requests'}
			nm
			to="/follow-requests"
		>
			<IconUserPlus size="var(--fs-lg)" />
		</Button>
		<hr />
		<Button
			circle
			accentLight={page.url.pathname === '/search'}
			transparent={page.url.pathname !== '/search'}
			nm
			to="/search"
		>
			<IconSearch size="var(--fs-lg)" />
		</Button>
		<Button
			circle
			accentLight={page.url.pathname === '/explore'}
			transparent={page.url.pathname !== '/explore'}
			nm
			to="/explore"
		>
			<IconHash size="var(--fs-lg)" />
		</Button>
		<hr />
		<Button
			circle
			accentLight={page.url.pathname === '/drive'}
			transparent={page.url.pathname !== '/drive'}
			nm
			to="/drive"
		>
			<IconCloud size="var(--fs-lg)" />
		</Button>
		<Button
			circle
			accentLight={page.url.pathname === '/bookmarks'}
			transparent={page.url.pathname !== '/bookmarks'}
			nm
			to="/bookmarks"
		>
			<IconBookmark size="var(--fs-lg)" />
		</Button>
		<hr />
		<Button
			circle
			accentLight={page.url.pathname.startsWith('/settings')}
			transparent={!page.url.pathname.startsWith('/settings')}
			nm
			to="/settings"
		>
			<IconSettings size="var(--fs-lg)" />
		</Button>
		<Button
			circle
			accentLight={page.url.pathname.startsWith('/admin')}
			transparent={!page.url.pathname.startsWith('/admin')}
			nm
			to="/admin"
		>
			<IconDashboard size="var(--fs-lg)" />
		</Button>
	</div>
{/if}

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
