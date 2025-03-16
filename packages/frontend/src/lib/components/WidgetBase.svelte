<script lang="ts">
	import { innerWidth } from 'svelte/reactivity/window';
	import Boundary from '$lib/components/Boundary.svelte';

	let { transparent = false, tl = false, header = false } = $props();
</script>

<Boundary>
	<div>
		{#if header && (innerWidth.current ?? 0) > 1355}
			<div class="header">
				<slot name="header"></slot>
			</div>
		{/if}
		<div
			class={'widget' +
				(transparent ? ' transparent' : '') +
				(tl ? ' tl' : '')}
		>
			<slot />
		</div>
	</div>
</Boundary>

<style lang="scss" scoped>
	.header {
		display: flex;
		align-items: center;
		gap: 8px;

		padding: 14px 18px;
		font-weight: 500;
	}

	.widget {
		width: 100%;
		box-sizing: border-box;

		max-width: 325px;
		max-height: 400px;
		overflow-y: auto;

		padding: 12px 16px;

		&.tl {
			padding: 8px;
		}

		&:not(.transparent) {
			background: var(--bg2);
			border-radius: var(--br-lg);
		}
	}
</style>
