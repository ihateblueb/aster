<script>
	import { page } from '$app/stores';
	import driveFileGet from '$lib/api/drive/file/get';
	import Button from '$lib/components/Button.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { locale } from '$lib/locale';
	import { onMount } from 'svelte';

	let data = {};

	async function refresh() {
		data = {};
		data = await driveFileGet($page.params.fileid);
	}

	onMount(async () => {
		data = await driveFileGet($page.params.fileid);
	});
</script>

<template>
	<PageHeader
		title={locale('drive') + ' / ' + $page.params.fileid}
		icon="file"
	>
		<Button
			type="header"
			on:click={() => {
				refresh();
			}}
		>
			<Icon name="refresh" size="16px" />
		</Button>
	</PageHeader>

	<div class="pageContent">
		<div class="paddedPage">
			{#key data}
				<p>{JSON.stringify(data)}</p>
			{/key}
		</div>
	</div>
</template>
