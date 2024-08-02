<script>
	import { page } from '$app/stores';
	import { locale } from '$lib/locale';

	import PageHeader from '$lib/components/PageHeader.svelte';
	import Note from '$lib/components/Note.svelte';
	import Button from '$lib/components/Button.svelte';

	export let data;
</script>

<template>
	<PageHeader
		title="{locale('note_by')} {data.author.displayname
			? data.author.displayname
			: data.author.username}"
		icon="note"
	/>
	<div class="pageContent">
		{#key data}
			{#if data.replying_to}
				<Note data={data.replying_to} />
			{/if}

			<Note {data} detailed={true} />
		{/key}
	</div>
</template>
