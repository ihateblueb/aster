<script>
	import Avatar from '$lib/components/Avatar.svelte';
	import Time from '$lib/components/Time.svelte';
	import Mfm from '$lib/components/Mfm.svelte';

	let { user, time = undefined, admin = false } = $props();

	let link = admin
		? '/admin/moderation/users/' + user.id
		: '/@' + (user.username + (user.local ? '' : '@' + user.host));
</script>

<div class="userCard">
	<Avatar {user} size="35px" />
	<div class="names">
		<a class="top" href={link}>
			<Mfm
				content={user.displayName ? user.displayName : user.username}
				emojis={user.emojis}
				simple
			/>
		</a>
		<a class="bottom" href={link}>
			@{user.username}{#if !user.local}
				<span class="host">@{user.host}</span>
			{/if}
		</a>
	</div>
	{#if time}
		<Time {time} />
	{/if}
</div>

<style lang="scss" scoped>
	.userCard {
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
	}
</style>
