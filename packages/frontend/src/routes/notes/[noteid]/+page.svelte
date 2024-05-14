<script>
	import { page } from '$app/stores';
	import Note from '$lib/components/Note.svelte';

	export let data;
</script>

<div>
	<div class="pageHeader">
		<p>Note by {data.author.displayname}</p>
	</div>
	<div class="pageContent">
		<Note {data} />
	</div>
</div>
