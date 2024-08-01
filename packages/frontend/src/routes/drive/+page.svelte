<script>
	import { locale } from '$lib/locale';

	import PageHeader from '$lib/components/PageHeader.svelte';
	import Button from '$lib/components/Button.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import driveGet from '$lib/api/drive/get';
	import { onMount } from 'svelte';
	import driveFileAdd from '$lib/api/drive/file/add';

	let fileinput;

	async function fileSelected(e) {
		console.log(e.target.files);

		Array.from(e.target.files).forEach(async (file) => {
			await driveFileAdd(file);
		});
	}

	let drive = [];

	onMount(async () => {
		drive = await driveGet();
	});
</script>

<template>
	<PageHeader title={locale('drive')} icon="folder">
		<input
			style="display: none;"
			type="file"
			multiple
			on:change={(e) => fileSelected(e)}
			bind:this={fileinput}
		/>
		<Button
			type="header"
			on:click={() => {
				fileinput.click();
			}}
		>
			<Icon name="plus" size="16px" />
		</Button>
	</PageHeader>

	<div class="pageContent">
		<div class="paddedPage">
			{#key drive}
				{#if drive.length > 0}
					{#each drive as item}
						{JSON.stringify(item)}
					{/each}
				{:else}
					<p>No items in drive</p>
				{/if}
			{/key}
		</div>
	</div>
</template>
