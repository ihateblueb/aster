<script>
	import { IconLoader2 } from '@tabler/icons-svelte';

	export let size = '38px';
	export let color = 'var(--tx1)';
	export let massive = true;
</script>

<div
	class={'loading' + (massive ? ' massive' : '')}
	style={'color:' + color + ';'}
>
	<div class="spinner">
		<IconLoader2 {size} />
	</div>
</div>

<style lang="scss" scoped>
	@keyframes loading {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.loading {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		&.massive {
			width: 100%;
			height: 100%;
		}

		&:not(.massive) {
			padding: 5px;
		}
	}

	.spinner {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		animation: loading 1.25s infinite;
	}
</style>
