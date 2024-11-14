<script>
	export let user;
</script>

<img
	class="avatar"
	src={user.avatar ?? '/fallback/avatar.png'}
	alt={user.avatarAlt}
/>

<style lang="scss">
	img {
		border-radius: var(--br-md);
		height: 45px;
		width: 45px;

		user-select: none;
	}
</style>
