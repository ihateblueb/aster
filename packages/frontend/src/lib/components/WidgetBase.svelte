<script lang="ts">
	export let transparent = false;
</script>

<div class={'widget' + (transparent ? ' transparent' : '')}>
	<slot />
</div>

<style lang="scss" scoped>
	.widget {
		width: 100%;
		max-width: 325px;

		box-sizing: border-box;

		padding: 12px 16px;

		&:not(.transparent) {
			background: var(--bg2);
			border-radius: var(--br-lg);
		}
	}
</style>
