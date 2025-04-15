<script lang="ts">
	import {
		IconAt,
		IconBan,
		IconCopy,
		IconDental,
		IconExternalLink,
		IconFlag,
		IconLink,
		IconPencil,
		IconRefresh,
		IconTrash,
		IconVolumeOff
	} from '@tabler/icons-svelte';
	import DropdownItem from '../DropdownItem.svelte';
	import Modal from '../Modal.svelte';
	import DropdownDivider from '../DropdownDivider.svelte';
	import biteUser from '$lib/api/user/bite.js';
	import refetchUser from '$lib/api/user/refetch.js';
	import localstore from '$lib/localstore.js';
	import { page } from '$app/state';
	import LocalizedString from '$lib/components/LocalizedString.svelte';

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
		<LocalizedString id="edit-profile" />
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
	<LocalizedString id="copy-handle" />
</DropdownItem>
<!-- TODO: wrong -->
<DropdownItem
	on:click={() =>
		navigator.clipboard.writeText(
			query.data.local ? page.url.href : query.data.apId
		)}
>
	<IconLink size="18px" />
	<LocalizedString id="copy-link" />
</DropdownItem>
<DropdownItem on:click={() => navigator.clipboard.writeText(query.data.id)}>
	<IconCopy size="18px" />
	<LocalizedString id="copy-id" />
</DropdownItem>

{#if !isLocal}
	<DropdownDivider />
	<DropdownItem to={query.data.apId} newTab>
		<IconExternalLink size="18px" />
		<LocalizedString id="view-on-remote" />
	</DropdownItem>
	<DropdownItem
		on:click={() =>
			refetchUser(query.data.id).then(() => {
				query.refetch();
			})}
	>
		<IconRefresh size="18px" />
		<LocalizedString id="refetch-from-remote" />
	</DropdownItem>
{/if}

{#if !isSelf}
	<DropdownDivider />
	<DropdownItem on:click={() => biteUser(query.data.id)}>
		<IconDental size="18px" />
		<LocalizedString id="bite" />
	</DropdownItem>
	<DropdownDivider />
	<DropdownItem danger>
		<IconBan size="18px" />
		<LocalizedString id="block" />
	</DropdownItem>
	<DropdownItem danger>
		<IconVolumeOff size="18px" />
		<LocalizedString id="mute" />
	</DropdownItem>
	<DropdownItem danger>
		<IconFlag size="18px" />
		<LocalizedString id="report" />
	</DropdownItem>
{/if}
