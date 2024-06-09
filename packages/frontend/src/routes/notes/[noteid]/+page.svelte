<script>
	import { page } from '$app/stores';
	import { locale } from '$lib/locale';

	import PageHeader from '$lib/components/PageHeader.svelte';
	import Note from '$lib/components/Note.svelte';
	import Button from '$lib/components/LinkButton.svelte';

	export let data;
</script>

<svelte:head>
	<title>{locale('note_by')} {data.author.displayname}</title>
</svelte:head>

<template>
	<PageHeader title="{locale('note_by')} {data.author.displayname}" />
	<div class="pageContent">
		<Note {data} detailed={true} />
	</div>
</template>
