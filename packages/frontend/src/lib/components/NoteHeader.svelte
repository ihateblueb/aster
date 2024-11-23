<script>
	import Visibility from '$lib/components/Visibility.svelte';
	import Avatar from '$lib/components/Avatar.svelte';
	import Time from '$lib/components/Time.svelte';

	export let note;
</script>

<header>
	<div class="left">
		<Avatar user={note.user} />
		<div class="names">
			<a
				class="top"
				href={'/@' +
					note.user.username +
					(note.user.local ? '' : '@' + note.user.host)}
			>
				{note.user.displayName
					? note.user.displayName
					: note.user.username}
			</a>
			<a
				class="bottom"
				href={'/@' +
					note.user.username +
					(note.user.local ? '' : '@' + note.user.host)}
			>
				@{note.user.username}{#if !note.user.local}
					<span class="host">@{note.user.host}</span>
				{/if}
			</a>
		</div>
	</div>
	<div class="right">
		<Visibility visibility={note.visibility} />
		<Time time={note.createdAt} />
	</div>
</header>

<style lang="scss">
	header {
		display: flex;
		align-items: center;
		gap: 10px;

		.left {
			display: flex;
			align-items: center;
			gap: 10px;
			flex-grow: 1;

			.names {
				display: flex;
				align-items: start;
				flex-direction: column;
				flex-grow: 1;

				.top {
					font-weight: 600;
					color: var(--tx2);
					text-decoration: none;
				}
				.bottom {
					color: var(--tx2);
					text-decoration: none;

					.host {
						color: var(--tx3);
					}
				}
			}
		}

		.right {
			display: flex;
			align-items: center;
			flex-direction: column;
			gap: 5px;
			font-size: var(--fs-sm);
		}
	}
</style>
