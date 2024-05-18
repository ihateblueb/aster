<script>
	import { page } from '$app/stores';
	import Note from '$lib/components/Note.svelte';

	export let data;
</script>

<svelte:head>
	<title>Note by {data.author.displayname}</title>
</svelte:head>

<div>
	<div class="pageHeader">
		<p>Note by {data.author.displayname}</p>
	</div>
	<div class="pageContent">
		<Note {data} />
	</div>
</div>
