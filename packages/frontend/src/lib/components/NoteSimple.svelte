<script>
	import Visibility from '$lib/components/Visibility.svelte';
	import Avatar from '$lib/components/Avatar.svelte';
	import Time from '$lib/components/Time.svelte';
	import Mfm from '$lib/components/Mfm.svelte';

	export let note;
</script>

<div class="noteSimple">
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
					@{note.user.username}
					{#if !note.user.local}
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
		<Mfm content={note.content} simple />
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
		.header {
			display: flex;
			align-items: center;
			gap: 10px;
			margin-bottom: 5px;
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
	}
</style>
