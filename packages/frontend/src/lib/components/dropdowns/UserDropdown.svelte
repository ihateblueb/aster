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

	let { user } = $props();
</script>

<DropdownItem
	on:click={() =>
		navigator.clipboard.writeText('@' + user.username + '@' + user.host)}
>
	<IconAt size="var(--fs-lg)" />
	Copy handle
</DropdownItem>
{#if !user.local}
	<DropdownItem to={user.apId}>
		<IconExternalLink size="var(--fs-lg)" />
		View on remote
	</DropdownItem>
	<DropdownItem on:click={() => refetchUser(user.id)}>
		<IconRefresh size="var(--fs-lg)" />
		Refetch from remote
	</DropdownItem>
{/if}

<DropdownDivider />
<DropdownItem on:click={() => biteUser(user.id)}>
	<IconDental size="var(--fs-lg)" />
	Bite
</DropdownItem>
<DropdownDivider />
<DropdownItem danger>
	<IconBan size="var(--fs-lg)" />
	Block
</DropdownItem>
<DropdownItem danger>
	<IconVolumeOff size="var(--fs-lg)" />
	Mute
</DropdownItem>
<DropdownItem danger>
	<IconFlag size="var(--fs-lg)" />
	Report
</DropdownItem>
