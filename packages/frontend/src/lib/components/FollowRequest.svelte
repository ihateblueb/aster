<script>
	import Avatar from '$lib/components/Avatar.svelte';
	import Mfm from '$lib/components/Mfm.svelte';
	import acceptFollowRequest from '$lib/api/follow-requests/accept';
	import rejectFollowRequest from '$lib/api/follow-requests/reject';
	import Button from '$lib/components/Button.svelte';

	let { followRequest } = $props();

	let user = $state(followRequest?.from);
	let show = $state(false);
</script>

{#if show}
	<div class="followRequest">
		<Avatar {user} size="35px" />
		<div class="names">
			<a
				class="top"
				href={'/@' +
					user.username +
					(user.local ? '' : '@' + user.host)}
			>
				<Mfm
					content={user.displayName
						? user.displayName
						: user.username}
					emojis={user.emojis}
					simple
				/>
			</a>
			<a
				class="bottom"
				href={'/@' +
					user.username +
					(user.local ? '' : '@' + user.host)}
			>
				@{user.username}{#if !user.local}
					<span class="host">@{user.host}</span>
				{/if}
			</a>
		</div>
		<div class="actions">
			<Button
				accent
				nm
				on:click={() =>
					acceptFollowRequest(followRequest.id).then(
						() => (show = false)
					)}
			>
				Accept
			</Button>
			<Button
				nm
				on:click={() =>
					rejectFollowRequest(followRequest.id).then(
						() => (show = false)
					)}
			>
				Reject
			</Button>
		</div>
	</div>
{/if}

<style lang="scss" scoped>
	.followRequest {
		display: flex;
		align-items: center;
		gap: 10px;

		padding: 12px;
		transition: 0.1s;

		&:hover {
			border-radius: var(--br-md);
			background-color: var(--bg3-25);
		}

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
				color: var(--tx2);
				text-decoration: none;

				white-space: inherit;
				text-overflow: inherit;
				overflow: inherit;
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

		.actions {
			display: flex;
			align-items: center;
			gap: 10px;
		}
	}
</style>
