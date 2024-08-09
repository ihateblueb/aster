<script lang="ts">
	import { locale } from '$lib/locale';

	import Button from '$lib/components/Button.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import DropdownItem from '$lib/components/DropdownItem.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';

	let adminNavigation: Dropdown;
</script>

<template>
	<PageHeader title={locale('admin_panel')} icon="dashboard">
		<Button
			slot="navigation"
			type="header"
			on:click={(e) => adminNavigation.open(e)}
		>
			<Icon name="chevron-down" size="16px" />
		</Button>
	</PageHeader>

	<Dropdown bind:this={adminNavigation}>
		<DropdownItem to="/admin">
			<Icon name="home" size="18px" margin="0px 8px 0px 0px" />
			<span> Home </span>
		</DropdownItem>
		<DropdownItem to="/admin/users">
			<Icon name="users" size="18px" margin="0px 8px 0px 0px" />
			<span> Users </span>
		</DropdownItem>
		<DropdownItem to="/admin/roles">
			<Icon name="rosette" size="18px" margin="0px 8px 0px 0px" />
			<span> Roles </span>
		</DropdownItem>
		<DropdownItem to="/admin/emojis">
			<Icon name="mood-happy" size="18px" margin="0px 8px 0px 0px" />
			<span> Emojis </span>
		</DropdownItem>
		<DropdownItem to="/admin/logs">
			<Icon name="clipboard-text" size="18px" margin="0px 8px 0px 0px" />
			<span> Audit Log </span>
		</DropdownItem>
		<DropdownItem to="/admin/queue">
			<Icon name="target-arrow" size="18px" margin="0px 8px 0px 0px" />
			<span> Queue </span>
		</DropdownItem>
		<hr />
		<DropdownItem to="/admin/moderated-instances">
			<Icon name="gavel" size="18px" margin="0px 8px 0px 0px" />
			<span> Moderated Instances </span>
		</DropdownItem>
		<DropdownItem to="/admin/federation">
			<Icon name="planet" size="18px" margin="0px 8px 0px 0px" />
			<span> Federation </span>
		</DropdownItem>
		<DropdownItem to="/admin/relays">
			<Icon name="replace" size="18px" margin="0px 8px 0px 0px" />
			<span> Relays </span>
		</DropdownItem>
		<hr />
		<DropdownItem to="/admin/identity">
			<Icon name="user-scan" size="18px" margin="0px 8px 0px 0px" />
			<span> Identity </span>
		</DropdownItem>
		<DropdownItem to="/admin/drive">
			<Icon name="folder" size="18px" margin="0px 8px 0px 0px" />
			<span> Drive </span>
		</DropdownItem>
		<DropdownItem to="/admin/reports">
			<Icon
				name="exclamation-circle"
				size="18px"
				margin="0px 8px 0px 0px"
			/>
			<span> Reports </span>
		</DropdownItem>
		<DropdownItem to="/admin/ads">
			<Icon name="ad" size="18px" margin="0px 8px 0px 0px" />
			<span> Ads </span>
		</DropdownItem>
		<DropdownItem to="/admin/announcements">
			<Icon name="speakerphone" size="18px" margin="0px 8px 0px 0px" />
			<span> Announcements </span>
		</DropdownItem>
		<DropdownItem to="/admin/database">
			<Icon name="database" size="18px" margin="0px 8px 0px 0px" />
			<span> Database </span>
		</DropdownItem>
		<DropdownItem to="/admin/external">
			<Icon name="external-link" size="18px" margin="0px 8px 0px 0px" />
			<span> External Services </span>
		</DropdownItem>
	</Dropdown>

	<slot class="slot"></slot>
</template>
