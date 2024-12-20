<script lang="ts">
	import {
		IconBan,
		IconCopy,
		IconExternalLink,
		IconFlag
	} from '@tabler/icons-svelte';
	import Dropdown from '../Dropdown.svelte';
	import DropdownItem from '../DropdownItem.svelte';
	import Modal from '../Modal.svelte';
	import Button from '../Button.svelte';
	import DropdownDivider from '../DropdownDivider.svelte';
	import Toggle from '../Toggle.svelte';
	import Input from '../Input.svelte';

	let blockModal: Modal;

	export let bind: Dropdown;
	export let user;
</script>

<Dropdown bind:this>
	<DropdownItem>
		<IconCopy size="var(-fs-lg)" />
		Copy username
	</DropdownItem>
	<DropdownItem>
		<IconExternalLink size="var(--fs-lg)" />
		View on remote
	</DropdownItem>
	<DropdownDivider />
	<DropdownItem>
		<IconFlag size="var(--fs-lg)" />
		Report
	</DropdownItem>
	<DropdownItem on:click={() => blockModal.open()}>
		<IconBan size="var(--fs-lg)" />
		Block
	</DropdownItem>
</Dropdown>

<Modal bind:this={blockModal}>
	<svelte:fragment slot="text">
		<h2>Report on {user.displayName ?? user.username ?? 'this user'}</h2>
	</svelte:fragment>
	<Input big label="Comments" />
	<svelte:fragment slot="buttons">
		<Toggle label="Forward report to remote instance" />
		<div>
			<Button accent>Submit</Button>
			<Button on:click={() => blockModal.close()}>Cancel</Button>
		</div>
	</svelte:fragment>
</Modal>

<Modal bind:this={blockModal}>
	<svelte:fragment slot="text">
		<h2>Block {user.displayName ?? user.username ?? 'this user'}?</h2>
		<p>
			You will no longer see this user and they will no longer be allowed
			to interact with you.
		</p>
	</svelte:fragment>
	<svelte:fragment slot="buttons">
		<Button danger>Block</Button>
		<Button on:click={() => blockModal.close()}>Cancel</Button>
	</svelte:fragment>
</Modal>
