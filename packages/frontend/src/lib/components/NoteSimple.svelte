<script>
	import Visibility from '$lib/components/Visibility.svelte';
	import Avatar from '$lib/components/Avatar.svelte';
	import Time from '$lib/components/Time.svelte';
	import Mfm from '$lib/components/Mfm.svelte';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';

	let { note, nobg = false, nomargin = false } = $props();

	let cwOpen = $state(false);
</script>

<div
	class={'noteSimple' + (nobg ? ' nobg' : '') + (nomargin ? ' nomargin' : '')}
>
	<div class="header">
		<Avatar user={note.user} size="25px" small />
		<div class="left">
			<span>
				<a
					href={'/@' +
						note.user.username +
						(note.user.local ? '' : '@' + note.user.host)}
				>
					{note.user.displayName
						? note.user.displayName
						: note.user.username}
				</a>
				<a
					class="handle"
					href={'/@' +
						note.user.username +
						(note.user.local ? '' : '@' + note.user.host)}
				>
					@{note.user.username}{#if !note.user.local}
						<span class="host">@{note.user.host}</span>
					{/if}
				</a>
			</span>
		</div>
		<div class="right">
			<Time time={note.createdAt} />
			<Visibility visibility={note.visibility} />
		</div>
	</div>
	<div class="body">
		{#if note.cw}
			<div class={'cw' + (cwOpen ? ' open' : '')}>
				<span>{note.cw}</span>
				<Button thin nm on:click={() => (cwOpen = !cwOpen)}>
					{!cwOpen ? 'Show content' : 'Hide content'}
				</Button>
			</div>
			{#if cwOpen}
				<Mfm
					content={note.content}
					on:click={() => goto('/notes/' + note.id)}
				/>
			{/if}
		{:else}
			<Mfm
				content={note.content}
				simple
				on:click={() => goto('/notes/' + note.id)}
			/>
		{/if}
	</div>
</div>

<style lang="scss" scoped>
	.noteSimple {
		padding: 10px;
		border: 1px solid var(--bg3);
		border-radius: var(--br-md);
		margin-bottom: 10px;
		transition: 0.1s;

		&:hover {
			background-color: var(--bg3-50);
		}

		&.nobg {
			padding: 0;
			border: none;
			&:hover {
				background: none;
			}
		}

		&.nomargin {
			margin-bottom: 0;
		}

		.header {
			display: flex;
			align-items: center;
			gap: 10px;
			margin-bottom: 5px;

			.left {
				display: flex;
				align-items: center;
				gap: 10px;

				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;

				flex-grow: 1;

				a {
					font-weight: 600;
					color: var(--tx2);
					text-decoration: none;
				}
				.handle {
					font-weight: 400;
					color: var(--tx3);
				}
			}

			.right {
				display: flex;
				align-items: center;
				gap: 5px;
				font-size: var(--fs-sm);
			}
		}

		.body {
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
		}
	}
</style>
