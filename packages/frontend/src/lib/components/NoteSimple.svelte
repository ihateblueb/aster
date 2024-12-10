<script>
	import Visibility from '$lib/components/Visibility.svelte';
	import Avatar from '$lib/components/Avatar.svelte';
	import Time from '$lib/components/Time.svelte';
	import Mfm from '$lib/components/Mfm.svelte';
	import { goto } from '$app/navigation';

	export let note;
	export let nobg = false;
</script>

<div class={'noteSimple' + (nobg ? ' nobg' : '')}>
	<div class="header">
		<div class="left">
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
	<p>
		<Mfm
			content={note.content}
			simple
			on:click={() => goto('/notes/' + note.id)}
		/>
	</p>
</div>

<style lang="scss">
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

		.header {
			display: flex;
			align-items: center;
			gap: 10px;
			margin-bottom: 5px;

			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;

			.left {
				display: flex;
				align-items: center;
				gap: 10px;

				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;

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
				flex-grow: 1;
			}
		}
	}
</style>
