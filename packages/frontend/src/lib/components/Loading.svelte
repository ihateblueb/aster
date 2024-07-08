<script>
	import Icon from './Icon.svelte';
</script>

<template>
	<div class="spin">
		<Icon name="loader-2" size="32px" color="var(--accent)" />
	</div>
</template>

<style lang="scss">
	@keyframes spin {
		0% {
			rotate: 0deg;
		}
		100% {
			rotate: 360deg;
		}
	}

	.spin {
		display: flex;
		animation: spin;
		animation-duration: 1s;
		animation-iteration-count: infinite;
	}
</style>
