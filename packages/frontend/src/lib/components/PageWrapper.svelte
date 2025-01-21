<script lang="ts">
	let { nm = false, tl = false, centered = false } = $props();
</script>

<div
	class={'pageWrapper' +
		(nm ? ' nm' : '') +
		(tl ? ' tl' : '') +
		(centered ? ' centered' : '')}
>
	<slot></slot>
</div>

<style lang="scss" scoped>
	.pageWrapper {
		height: calc(100vh - 50px);
		overflow-y: scroll;

		background: var(--bg2);

		border-radius: var(--br-lg) var(--br-lg) 0 0;

		&:not(.nm) {
			// minus PageHeader, minus top and bottom padding
			height: calc((100vh - 50px) - (12px * 2));
			padding: 12px;
		}

		&.tl {
			height: calc((100vh - 50px) - (8px * 2));
			padding: 8px;
		}

		&.centered {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			gap: 10px;
		}
	}
</style>
