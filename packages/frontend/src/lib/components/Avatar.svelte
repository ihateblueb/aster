<script>
	export let user;
	export let size = '45px';
	export let small = false;
</script>

<img
	class={'avatar' + (small ? ' small' : '')}
	style={`height:${size};width:${size};`}
	src={user?.avatar ?? '/fallback/avatar.png'}
	alt={user?.avatarAlt}
/>

<style lang="scss">
	.avatar {
		border-radius: var(--br-md);
		user-select: none;

		&.small {
			border-radius: var(--br-sm);
		}
	}
</style>
