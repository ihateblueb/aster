<script lang="ts">
	export let big = false;
	export let type = '';
	export let formtype = '';
	export let placeholder = '';
	export let value = '';

	function formType(node) {
		if (formtype) {
			node.type = formtype;
		}
	}
</script>

<template>
	{#if big}
		<textarea class={'ipt ' + type} use:formType {placeholder} bind:value />
	{:else}
		<input class={'ipt ' + type} use:formType {placeholder} bind:value />
	{/if}
</template>

<style lang="scss">
	.ipt {
		display: inline-block;
		background-color: var(--bg-secondary);
		color: var(--txt-secondary);
		font-size: var(--font-m);
		padding: 8px 12px;
		margin: 5px 0px;
		border-radius: var(--border-m);
		border: none;
		font-family: inherit;

		&.wide {
			width: 100%;
			box-sizing: border-box;
		}

		&:not(.wide) {
			width: 250px;
		}

		outline: 2px var(--accent);
		outline-offset: 1px;
	}
</style>
