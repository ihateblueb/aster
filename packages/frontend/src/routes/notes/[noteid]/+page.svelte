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
		{@html JSON.stringify(data)}
	</div>
</div>

<style lang="scss">
	.pageHeader {
		width: 100%;
		padding: 8px;
		background-color: var(--bg-primary-50);
	}
</style>
