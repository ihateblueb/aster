<script lang="ts">
	import {
		IconAt,
		IconBan,
		IconCopy,
		IconDental,
		IconExternalLink,
		IconFlag,
		IconRefresh,
		IconVolumeOff
	} from '@tabler/icons-svelte';
	import DropdownItem from '../DropdownItem.svelte';
	import Modal from '../Modal.svelte';
	import DropdownDivider from '../DropdownDivider.svelte';
	import biteUser from '$lib/api/user/bite.js';
	import refetchUser from '$lib/api/user/refetch.js';

	let reportModal: undefined | Modal = $state();
	let blockModal: undefined | Modal = $state();

	let { query } = $props();
</script>

<DropdownItem
	on:click={() =>
		navigator.clipboard.writeText(
			'@' + query.data.username + '@' + query.data.host
		)}
>
	<IconAt size="18px" />
	Copy handle
</DropdownItem>
{#if !query.data.local}
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
