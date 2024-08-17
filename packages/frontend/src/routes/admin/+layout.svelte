<script lang="ts">
	import { locale } from '$lib/locale';

	import Button from '$lib/components/Button.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import DropdownItem from '$lib/components/DropdownItem.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';

	let adminNavigation: Dropdown;
	let subpath;

	$: subpath;
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
			<span> {locale('home')} </span>
		</DropdownItem>
		<DropdownItem to="/admin/users">
			<Icon name="users" size="18px" margin="0px 8px 0px 0px" />
			<span> {locale('users')} </span>
		</DropdownItem>
		<DropdownItem to="/admin/roles">
			<Icon name="rosette" size="18px" margin="0px 8px 0px 0px" />
			<span> {locale('roles')} </span>
		</DropdownItem>
		<DropdownItem to="/admin/emojis">
			<Icon name="mood-happy" size="18px" margin="0px 8px 0px 0px" />
			<span> {locale('emojis')} </span>
		</DropdownItem>
		<DropdownItem to="/admin/logs">
			<Icon name="clipboard-text" size="18px" margin="0px 8px 0px 0px" />
			<span> {locale('audit_log')} </span>
		</DropdownItem>
		<DropdownItem to="/admin/queue">
			<Icon name="target-arrow" size="18px" margin="0px 8px 0px 0px" />
			<span> {locale('queue')} </span>
		</DropdownItem>
		<hr />
		<DropdownItem to="/admin/moderated-instances">
			<Icon name="gavel" size="18px" margin="0px 8px 0px 0px" />
			<span> {locale('moderated_instances')} </span>
		</DropdownItem>
		<DropdownItem to="/admin/federation">
			<Icon name="planet" size="18px" margin="0px 8px 0px 0px" />
			<span> {locale('federation')} </span>
		</DropdownItem>
		<DropdownItem to="/admin/relays">
			<Icon name="replace" size="18px" margin="0px 8px 0px 0px" />
			<span> {locale('relays')} </span>
		</DropdownItem>
		<hr />
		<DropdownItem to="/admin/identity">
			<Icon name="user-scan" size="18px" margin="0px 8px 0px 0px" />
			<span> {locale('instance_identity')} </span>
		</DropdownItem>
		<DropdownItem to="/admin/drive">
			<Icon name="folder" size="18px" margin="0px 8px 0px 0px" />
			<span> {locale('drive')} </span>
		</DropdownItem>
		<DropdownItem to="/admin/reports">
			<Icon
				name="exclamation-circle"
				size="18px"
				margin="0px 8px 0px 0px"
			/>
			<span> {locale('reports')} </span>
		</DropdownItem>
		<DropdownItem to="/admin/ads">
			<Icon name="ad" size="18px" margin="0px 8px 0px 0px" />
			<span> {locale('ads')} </span>
		</DropdownItem>
		<DropdownItem to="/admin/announcements">
			<Icon name="speakerphone" size="18px" margin="0px 8px 0px 0px" />
			<span> {locale('announcements')} </span>
		</DropdownItem>
		<DropdownItem to="/admin/search">
			<Icon name="search" size="18px" margin="0px 8px 0px 0px" />
			<span> {locale('search')} </span>
		</DropdownItem>
		<DropdownItem to="/admin/database">
			<Icon name="database" size="18px" margin="0px 8px 0px 0px" />
			<span> {locale('database')} </span>
		</DropdownItem>
		<DropdownItem to="/admin/external">
			<Icon name="external-link" size="18px" margin="0px 8px 0px 0px" />
			<span> {locale('external_services')} </span>
		</DropdownItem>
	</Dropdown>

	<slot class="slot"></slot>
</template>
