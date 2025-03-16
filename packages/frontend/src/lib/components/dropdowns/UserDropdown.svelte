<script lang="ts">
	import {
		IconAt,
		IconBan,
		IconDental,
		IconExternalLink,
		IconFlag,
		IconLink,
		IconPencil,
		IconRefresh,
		IconVolumeOff
	} from '@tabler/icons-svelte';
	import DropdownItem from '../DropdownItem.svelte';
	import Modal from '../Modal.svelte';
	import DropdownDivider from '../DropdownDivider.svelte';
	import biteUser from '$lib/api/user/bite.js';
	import refetchUser from '$lib/api/user/refetch.js';
	import localstore from '$lib/localstore.js';
	import { page } from '$app/state';

	let reportModal: undefined | Modal = $state();
	let blockModal: undefined | Modal = $state();

	let self = localstore.getParsed('self');

	let { query } = $props();

	let isLocal = query.data.local;
	let isSelf = query.data.id === self?.id;
</script>

{#if isSelf}
	<DropdownItem to="/settings/account">
		<IconPencil size="18px" />
		Edit profile
	</DropdownItem>
	<DropdownDivider />
{/if}

<DropdownItem
	on:click={() =>
		navigator.clipboard.writeText(
			'@' + query.data.username + '@' + query.data.host
		)}
>
	<IconAt size="18px" />
	Copy handle
</DropdownItem>
<!-- TODO: wrong -->
<DropdownItem
	on:click={() =>
		navigator.clipboard.writeText(
			query.data.local ? page.url.href : query.data.apId
		)}
>
	<IconLink size="18px" />
	<span>Copy link</span>
</DropdownItem>

{#if !isLocal}
	<DropdownItem to={query.data.apId} newTab>
		<IconExternalLink size="18px" />
		View on remote
	</DropdownItem>
	<DropdownItem
		on:click={() =>
			refetchUser(query.data.id).then(() => {
				query.refetch();
			})}
	>
		<IconRefresh size="18px" />
		Refetch from remote
	</DropdownItem>
{/if}

{#if !isSelf}
	<DropdownDivider />
	<DropdownItem on:click={() => biteUser(query.data.id)}>
		<IconDental size="18px" />
		Bite
	</DropdownItem>
	<DropdownDivider />
	<DropdownItem danger>
		<IconBan size="18px" />
		Block
	</DropdownItem>
	<DropdownItem danger>
		<IconVolumeOff size="18px" />
		Mute
	</DropdownItem>
	<DropdownItem danger>
		<IconFlag size="18px" />
		Report
	</DropdownItem>
{/if}
