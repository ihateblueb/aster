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
	import NoteAttachment from '$lib/components/NoteAttachment.svelte';
	import localstore from '$lib/localstore';

	let { note, expanded = false } = $props();

	let cwOpen = $state(false);
	if (localstore.get('uncollapseCws') === 'true') cwOpen = true;
</script>

{#snippet noteContent(data)}
	<Mfm
		content={data.content}
		emojis={data.emojis}
		on:click={() => (!expanded ? goto('/notes/' + data.id) : () => {})}
	/>
	{#if note.attachments && note.attachments.length > 0}
		<div
			class={'attachments' +
				(note.attachments.length > 1 ? ' multiple' : '')}
		>
			{#each note.attachments as attachment}
				<NoteAttachment {attachment} />
			{/each}
		</div>
	{/if}
{/snippet}

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
				{@render noteContent(data)}
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
			{@render noteContent(data)}
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

				color: var(--tx3);

				font-size: var(--fs-sm);
				font-weight: 500;

				a {
					color: var(--ac1);
				}
			}

			.attachments {
				display: grid;

				gap: 4px;
				margin-top: 10px;
				border-radius: var(--br-md);
				overflow: clip;

				&.multiple {
					grid-template-columns: repeat(2, 50%);
				}
			}
		}
	}
</style>
