<script>
	import NoteHeader from '$lib/components/NoteHeader.svelte';
	import NoteFooter from '$lib/components/NoteFooter.svelte';

	export let note;
</script>

<article>
	<NoteHeader {note} />
	<div class="content">
		{note.content}
	</div>
	<NoteFooter {note} />
</article>

<style lang="scss">
	article {
		padding: 16px;

		.content {
			margin: 10px 0;
		}
	}
</style>
