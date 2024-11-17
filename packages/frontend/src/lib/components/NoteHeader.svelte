<script>
	import Visibility from '$lib/components/Visibility.svelte';
	import Avatar from '$lib/components/Avatar.svelte';

	export let note;
</script>

<header>
	<div class="left">
		<Avatar user={note.user} />
		<div class="names">
			<span class="top">
				{note.user.displayName
					? note.user.displayName
					: note.user.username}
			</span>
			<span class="bottom">
				@{note.user.username}{#if note.user.local}
					@{note.user.host}
				{/if}
			</span>
		</div>
	</div>
	<div class="right">
		<Visibility visibility={note.visibility} />
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
				}
			}
		}
	}
</style>
