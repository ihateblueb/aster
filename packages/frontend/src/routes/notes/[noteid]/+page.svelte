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
		<Note {data} detailed={true} />
	</div>
</template>
