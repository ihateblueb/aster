<script>
	export let title = 'Page';
</script>

<template>
	<div class="pageHeader">
		<!--
		<Button type="header" on:click={() => history.back()}>
			<Icon name="arrow-left" />
		</Button>
		-->
		<p>{title}</p>
	</div>
</template>

<style lang="scss">
	.pageHeader {
		display: flex;
		align-items: center;
		padding: 12px 16px;
		background-color: var(--bg-primary-50);
		backdrop-filter: blur(6px);
		z-index: 2;
		position: relative;

		p {
			font-weight: 600;
		}
	}
</style>
