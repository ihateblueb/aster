<script lang="ts">
	export let type = 'primary';
	export let to = '/';
</script>

<template>
	<a class="btn {type}" href={to}>
		<slot></slot>
	</a>
</template>

<style lang="scss">
	.header {
		border: none;
		background-color: transparent;
		padding: 0px;
		margin: 0px;
		margin-right: 5px;
	}
	.wide {
		width: calc(100% - 8px);
		box-sizing: border-box;
	}
</style>
