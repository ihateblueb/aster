<script>
	import { IconLoader2 } from '@tabler/icons-svelte';
</script>

<div class="loading">
	<IconLoader2 size="38px" class="spinner" />
</div>

<style lang="scss">
	.loading {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}

	.spinner {
		animation: loading 1s infinite;
	}

	@keyframes loading {
		0% {
			rotation: 0deg;
		}
		100% {
			rotation: 360deg;
		}
	}
</style>
