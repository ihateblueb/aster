<script lang="ts">
	export let nm: Boolean = false;
</script>

<div class={'pageWrapper' + (nm ? ' nm' : '')}>
	<slot />
</div>

<style lang="scss">
	.pageWrapper {
		height: calc(100vh - 50px);
		overflow-y: scroll;

		background: var(--bg2);

		border-radius: var(--br-md) var(--br-md) 0 0;

		&:not(.nm) {
			// minus PageHeader, minus top and bottom padding
			height: calc((100vh - 50px) - (12px * 2));
			padding: 12px 16px;
		}
	}
</style>
