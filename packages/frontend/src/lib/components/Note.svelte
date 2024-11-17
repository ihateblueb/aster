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

<style lang="scss" scoped>
	article {
		padding: 16px;
		transition: 0.1s;

		.content {
			margin: 10px 0;
		}

		&:hover {
			border-radius: var(--br-md);
			background-color: var(--bg3-25);
		}
	}
</style>
