<script>
	export let user;
	export let size = '45px';
	export let small = false;
</script>

<a href={'/@' + user.username + (user.local ? '' : '@' + user.host)}>
	<img
		class={'avatar' + (small ? ' small' : '')}
		style={`height:${size};width:${size};`}
		src={user?.avatar ?? '/fallback/avatar.png'}
		alt={user?.avatarAlt}
	/>
</a>

<style lang="scss" scoped>
	a {
		display: flex;
		width: min-content;
		border-radius: var(--br-md);

		.avatar {
			border-radius: var(--br-md);
			user-select: none;

			&.small {
				border-radius: var(--br-sm);
			}
		}
	}
</style>
