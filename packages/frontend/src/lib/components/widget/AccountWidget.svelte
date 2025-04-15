<script lang="ts">
	import { innerWidth } from 'svelte/reactivity/window';
	import localstore from '$lib/localstore';
	import store from '$lib/store.js';
	import Button from '$lib/components/Button.svelte';
	import {
		IconLogin,
		IconLogout,
		IconReload,
		IconTrash,
		IconUser,
		IconUserPlus
	} from '@tabler/icons-svelte';
	import Avatar from '$lib/components/Avatar.svelte';
	import Mfm from '../Mfm.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import DropdownItem from '$lib/components/DropdownItem.svelte';
	import LocalizedString from '$lib/components/LocalizedString.svelte';

	let self = $state();
	function updateSelf() {
		self = localstore.getParsed('self');
	}
	updateSelf();

	let dropdown: Dropdown;
</script>

{#if self}
	<button class="accountWidget" on:click={(e) => dropdown.open(e)}>
		<Avatar
			user={self}
			size={(innerWidth.current ?? 0) > 1355 ? '40px' : '50px'}
			large={!((innerWidth.current ?? 0) > 1355)}
			link={false}
		/>
		<span class="names">
			<span class="top">
				<Mfm
					simple
					content={self.displayName
						? self.displayName
						: self.username}
				/>
			</span>
			<span class="bottom">
				@{self.username}
			</span>
		</span>
	</button>
{:else}
	<div class="accountWidget">
		<div class="btns">
			<Button to="/login" accent centered wide nm>
				<IconLogin size="18px" />
				<LocalizedString id="login" />
			</Button>
			<Button to="/register" secondary centered wide nm>
				<IconUserPlus size="18px" />
				<LocalizedString id="register" />
			</Button>
		</div>
	</div>
{/if}

<Dropdown bind:this={dropdown}>
	<DropdownItem
		to={'/@' + self.username + (self.local ? '' : '@' + self.host)}
	>
		<IconUser size="18px" />
		<LocalizedString id="profile" />
	</DropdownItem>
	<DropdownItem to="/logout" danger>
		<IconLogout size="18px" />
		<LocalizedString id="logout" />
	</DropdownItem>
</Dropdown>

<style lang="scss" scoped>
	@media (max-width: 1355px) {
		.accountWidget {
			justify-content: center;

			.names {
				display: none !important;
			}
		}
	}

	.accountWidget {
		display: flex;
		align-items: center;

		font-size: var(--fs-md);
		font-family: var(--font);

		background: none;
		border: none;

		.btns {
			display: flex;
			align-items: center;
			gap: 10px;
		}
		.names {
			display: flex;
			align-items: start;
			flex-direction: column;
			margin-left: 10px;
			width: 100%;

			color: var(--tx2);
			text-decoration: none;

			.top {
				font-weight: 600;
			}
		}
	}
</style>
