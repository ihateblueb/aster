<script>
	import { page } from '$app/stores';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Note from '$lib/components/Note.svelte';
	import Button from '$lib/components/LinkButton.svelte';

	export let data;
</script>

<svelte:head>
	<title>Note by {data.author.displayname}</title>
</svelte:head>

<PageHeader title="Note by {data.author.displayname}" />
<div class="pageContent">
	<Note {data} />
</div>
