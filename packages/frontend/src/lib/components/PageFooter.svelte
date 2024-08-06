<script>
	import Button from './Button.svelte';
	import Icon from './Icon.svelte';
</script>

<template>
	<div class="pageFooter">
		<Button type="footer" to="/explore">
			<Icon name="layout-sidebar-left-expand" /></Button
		>
		<Button type="footer" to="/">
			<Icon name="home" />
		</Button>
		<Button type="footer" to="/notifications">
			<Icon name="bell" /></Button
		>
		<Button type="footer" to="/explore">
			<Icon name="compass" /></Button
		>
		<Button type="footer" to="/">
			<Icon name="layout-sidebar-right-expand" /></Button
		>
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
		justify-content: space-around;

		position: absolute;
		width: calc(100% - 32px);
		bottom: 0;
		z-index: 1000;

		padding: 14px 16px;
		color: var(--txt-primary);
		background-color: var(--bg-primary-50);
		backdrop-filter: blur(16px);
	}
</style>
