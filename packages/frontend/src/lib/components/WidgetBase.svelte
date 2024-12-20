<script lang="ts">
	export let header;
</script>

<div class="widget">
	{#if header}
		<div class="header">
			<slot name="header" />
		</div>
	{/if}
	<slot />
</div>

<style lang="scss" scoped>
	.widget {
		width: 300px;

		padding: 12px 16px;

		background: var(--bg2);
		border-radius: var(--br-lg);

		.header {
			display: flex;
			align-items: center;
			gap: 10px;

			padding: 6px 8px;

			background-color: var(--bg3);
		}
	}
</style>
