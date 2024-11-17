<script>
	export let user;
	export let size = '45px';
</script>

<img
	class="avatar"
	style={`height:${size};width:${size};`}
	src={user.avatar ?? '/fallback/avatar.png'}
	alt={user.avatarAlt}
/>

<style lang="scss">
	img {
		border-radius: var(--br-md);

		user-select: none;
	}
</style>
