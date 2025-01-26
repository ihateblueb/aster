<script>
	import Visibility from '$lib/components/Visibility.svelte';
	import Avatar from '$lib/components/Avatar.svelte';
	import Time from '$lib/components/Time.svelte';
	import Mfm from './Mfm.svelte';

	let { note } = $props();
</script>

<header>
	{#if note.user}
		<Avatar user={note.user} />
		<div class="left">
			<div class="names">
				<a
					class="top"
					href={'/@' +
						note.user.username +
						(note.user.local ? '' : '@' + note.user.host)}
				>
					<Mfm
						simple
						content={note.user.displayName
							? note.user.displayName
							: note.user.username}
						emojis={note.user.emojis}
					/>
					{#if note.user.pronouns}
						<span class="pronouns">
							{note.user.pronouns}
						</span>
					{/if}
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
			{#if note.updatedAt}
				<span>
					<Time time={note.createdAt} to={'/notes/' + note.id} /><span
						title={'Updated at ' +
							new Date(note.updatedAt).toLocaleString()}>*</span
					>
				</span>
			{:else}
				<Time time={note.createdAt} to={'/notes/' + note.id} />
			{/if}
		</div>
	{/if}
</header>

<style lang="scss" scoped>
	header {
		display: flex;
		align-items: center;
		gap: 10px;

		.left {
			display: flex;
			align-items: center;
			gap: 10px;
			flex-grow: 1;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;

			.names {
				display: block;
				align-items: start;
				flex-direction: column;
				flex-grow: 1;

				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;

				.top {
					display: block;
					font-weight: 600;
					color: var(--tx2);
					text-decoration: none;

					white-space: inherit;
					text-overflow: inherit;
					overflow: inherit;

					.pronouns {
						font-weight: normal;
						font-size: var(--fs-sm);

						color: var(--tx3);
						padding: 0 4px;
					}
				}

				.bottom {
					display: block;
					color: var(--tx2);
					text-decoration: none;

					white-space: inherit;
					text-overflow: inherit;
					overflow: inherit;

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
