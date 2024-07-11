<script>
	import Button from './Button.svelte';
</script>

<template>
	<div class="pageFooter">
		<Button to="/">home</Button>
		<Button to="/explore">explore</Button>
		<Button to="/settings">settings</Button>
		<Button to="/login">login</Button>
		<Button to="/compose">compose</Button>
	</div>
</template>

<style lang="scss">
	@media screen and (max-width: 650px) {
		.pageFooter {
			display: flex !important;
		}
	}

	.pageFooter {
		display: none;
		align-items: center;
		padding: 14px 16px;
		color: var(--txt-primary);
		background-color: var(--bg-primary-50);
		backdrop-filter: blur(16px);
		position: sticky;
		bottom: 0;
		z-index: 1000;
	}
</style>
