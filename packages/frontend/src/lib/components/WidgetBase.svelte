<script lang="ts">
	import { innerWidth } from 'svelte/reactivity/window';

	let { transparent = false, header = false } = $props();
</script>

<div class={'widget' + (transparent ? ' transparent' : '')}>
	{#if header && (innerWidth.current ?? 0) > 1355}
		<div class="header">
			<slot name="header"></slot>
		</div>
	{/if}
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

		.header {
			display: flex;
			align-items: center;
			gap: 5px;

			position: sticky;
			top: 0;

			padding: 10px 12px;
			margin: -12px -16px;
			margin-bottom: 12px;

			font-weight: 600;
			border-radius: var(--br-lg) var(--br-lg) 0 0;
			backdrop-filter: blur(var(--blur-md));
			background-color: var(--bg2-75);

			width: 100%;
		}
	}
</style>
