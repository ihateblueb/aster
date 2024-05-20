<script>
	import { page } from '$app/stores';
	import Note from '$lib/components/Note.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Button from '$lib/components/Button.svelte';

	export let data;
</script>

<svelte:head>
	<title>Note by {data.author.displayname}</title>
</svelte:head>

<Note {data} />
