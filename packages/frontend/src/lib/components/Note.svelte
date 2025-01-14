<script>
	import NoteHeader from '$lib/components/NoteHeader.svelte';
	import NoteFooter from '$lib/components/NoteFooter.svelte';
	import Mfm from '$lib/components/Mfm.svelte';
	import { IconArrowBackUp, IconRepeat } from '@tabler/icons-svelte';
	import Time from '$lib/components/Time.svelte';
	import Avatar from '$lib/components/Avatar.svelte';
	import Visibility from '$lib/components/Visibility.svelte';
	import NoteSimple from '$lib/components/NoteSimple.svelte';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';

	let { note, expanded = false } = $props();

	let cwOpen = $state(false);
</script>

{#snippet renderNote(data, quote)}
	<NoteHeader note={data} />
	<div class="content">
		{#if data.cw}
			<div class={'cw' + (cwOpen ? ' open' : '')}>
				<span>{data.cw}</span>
				<Button thin nm on:click={() => (cwOpen = !cwOpen)}
					>{!cwOpen ? 'Show content' : 'Hide content'}
				</Button>
			</div>
			{#if cwOpen}
				<Mfm
					content={data.content}
					on:click={() =>
						!expanded ? goto('/notes/' + data.id) : () => {}}
				/>
			{/if}
		{:else}
			{#if !expanded && note.replyingTo}
				<p class="replyingToUser">
					<IconArrowBackUp size="var(--fs-lg)" />
					Replying to
					<a
						href={'/@' +
							note.user.username +
							(note.user.local ? '' : '@' + note.user.host)}
						>{'@' +
							note.user.username +
							(note.user.local ? '' : '@' + note.user.host)}
					</a>
				</p>
			{/if}
			<Mfm
				content={data.content}
				on:click={() =>
					!expanded ? goto('/notes/' + data.id) : () => {}}
			/>
		{/if}
	</div>
	{#if quote}
		<NoteSimple note={data.repeat} />
	{/if}
	<NoteFooter note={data} />
{/snippet}

<article class={expanded ? 'expanded' : ''}>
	{#if note.repeat && !note.content}
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
	{:else if note.repeat && note.content}
		{@render renderNote(note, true)}
	{:else}
		{@render renderNote(note)}
	{/if}
</article>

<style lang="scss" scoped>
	article {
		padding: 16px;
		transition: 0.1s;

		&:not(.expanded):hover {
			border-radius: var(--br-md);
			background-color: var(--bg3-25);
		}

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
				align-items: start;
				flex-direction: column;
				gap: 4px;

				width: 100%;

				&.open {
					margin-bottom: 5px;
				}
			}

			.replyingToUser {
				display: flex;
				align-items: center;

				margin-bottom: 4px;
				gap: 4px;

				color: var(--ac1);

				font-size: var(--fs-sm);
				font-weight: 500;

				a {
					color: inherit;
				}
			}
		}
	}
</style>
