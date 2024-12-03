<script>
	import NoteHeader from '$lib/components/NoteHeader.svelte';
	import NoteFooter from '$lib/components/NoteFooter.svelte';
	import Mfm from '$lib/components/Mfm.svelte';
	import Button from '$lib/components/Button.svelte';
	import { IconRepeat } from '@tabler/icons-svelte';
	import Time from '$lib/components/Time.svelte';
	import Avatar from '$lib/components/Avatar.svelte';
	import Visibility from '$lib/components/Visibility.svelte';

	export let note;

	let cwOpen = false;
</script>

{#snippet renderNote(data)}
	<NoteHeader note={data} />
	<div class="content">
		{#if data.cw}
			{#key cwOpen}
				<div class="cw">
					<span>{data.cw}</span>
					<button on:click={() => (cwOpen = !cwOpen)}
						>{!cwOpen ? 'Show' : 'Hide'}</button
					>
				</div>
				{#if cwOpen}
					<Mfm content={data.content} />
				{/if}
			{/key}
		{:else}
			<Mfm content={data.content} />
		{/if}
	</div>
	<NoteFooter note={data} />
{/snippet}

<article>
	{#if note.repeat}
		<div class="repeatHeader">
			<div class="left">
				<IconRepeat size="var(--fs-lg)" color="var(--tx2)" />
				<Avatar user={note.user} size="25px" small />
				<span>
					<a
						href={'/@' +
							note.user.username +
							(note.user.local ? '' : '@' + note.user.host)}
					>
						{note.user.displayName
							? note.user.displayName
							: note.user.username}
					</a> repeated
				</span>
			</div>
			<div class="right">
				<Time time={note.createdAt} />
				<Visibility visibility={note.visibility} />
			</div>
		</div>
		{@render renderNote(note.repeat)}
	{:else}
		{@render renderNote(note)}
	{/if}
</article>

<style lang="scss" scoped>
	article {
		padding: 16px;
		transition: 0.1s;

		.repeatHeader {
			display: flex;
			align-items: center;

			gap: 10px;
			margin-bottom: 10px;

			.left {
				display: flex;
				align-items: center;
				gap: 10px;
				flex-grow: 1;

				a {
					font-weight: 600;
					color: var(--tx2);
					text-decoration: none;
				}
			}

			.right {
				display: flex;
				align-items: center;
				gap: 5px;
				font-size: var(--fs-sm);
			}
		}

		.content {
			margin: 10px 0;

			.cw {
				display: flex;
				align-items: center;
				width: 100%;

				color: var(--ac1);
				font-weight: 500;
				background-color: var(--ac1-25);
				border-radius: var(--br-md);
				padding: 6px 10px;

				box-shadow: var(--funky-effect);
				box-sizing: border-box;
				margin-bottom: 10px;

				button {
					display: flex;
					align-items: center;
					box-sizing: border-box;

					border: none;
					border-radius: var(--br-md);
					padding: 6px 10px;

					font-family: var(--font);
					font-feature-settings: var(--font-features);
					font-size: var(--fs-md);
					font-weight: 400;
					text-decoration: none;

					transition:
						0.1s,
						width 0s,
						height 0s,
						outline 0s;

					color: var(--tx1);
					background-color: transparent;

					&:hover {
						color: var(--tx1);
						background-color: var(--ac1-25);
						box-shadow: var(--funky-effect);
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
