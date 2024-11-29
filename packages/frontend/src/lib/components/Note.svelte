<script>
	import NoteHeader from '$lib/components/NoteHeader.svelte';
	import NoteFooter from '$lib/components/NoteFooter.svelte';
	import Mfm from '$lib/components/Mfm.svelte';
	import Button from '$lib/components/Button.svelte';

	export let note;

	let cwOpen = false;
</script>

<article>
	<NoteHeader {note} />
	<div class="content">
		{#if note.cw}
			<div class="cw">
				<span>{note.cw}</span>
				<button on:click={() => (cwOpen = !cwOpen)}>Show</button>
			</div>
		{:else}
			<Mfm content={note.content} />
		{/if}
	</div>
	<NoteFooter {note} />
</article>

<style lang="scss" scoped>
	article {
		padding: 16px;
		transition: 0.1s;

		.content {
			margin: 10px 0;

			.cw {
				display: flex;
				align-items: center;
				width: 100%;

				button {
					display: flex;
					align-items: center;
					box-sizing: border-box;

					box-shadow: var(--funky-effect);
					border: none;
					border-radius: var(--br-md);
					padding: 6px 10px;

					font-family: var(--font);
					font-feature-settings: var(--font-features);
					font-size: var(--fs-md);
					text-decoration: none;

					transition:
						0.1s,
						width 0s,
						height 0s,
						outline 0s;

					color: var(--tx1);
					background-color: var(--bg3);

					&:hover {
						color: var(--tx1);
						background-color: var(--bg3-75);
					}
				}
				span {
					flex-grow: 1;
				}
			}
		}

		&:hover {
			border-radius: var(--br-md);
			background-color: var(--bg3-25);
		}
	}
</style>
