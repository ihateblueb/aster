<script lang="ts">
	export let setting = '';
</script>

<template>
	<select>
		<slot></slot>
	</select>
</template>

<style lang="scss">
	select {
		width: 100%;
		font-family: var(--font);
		background: var(--bg-secondary);
		color: var(--txt-secondary);
		border: none;
		border-radius: var(--border-m);
		padding: 8px 12px;
		font-size: var(--font-m);
	}
</style>
