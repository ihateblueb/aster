<script lang="ts">
	import { v4 as uuidv4 } from 'uuid';

	export let big = false;
	export let type = '';
	export let formtype = '';
	export let placeholder = '';
	export let value = '';
	export let label = '';

	let id = uuidv4();

	function formType(node) {
		if (formtype) {
			node.type = formtype;
		}
	}
</script>

<template>
	{#if big}
		{#if label}
			<label for={id}>{label}</label>
		{/if}
		<textarea
			{id}
			class={'ipt big ' + type}
			use:formType
			{placeholder}
			bind:value
		/>
	{:else}
		{#if label}
			<label for={id}>{label}</label>
		{/if}
		<input
			{id}
			class={'ipt ' + type}
			use:formType
			{placeholder}
			bind:value
		/>
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

		&.big {
			resize: vertical;
			height: 125px;
		}

		&.mb {
			margin-bottom: 12px;
		}

		&:not(.wide) {
			width: 250px;
		}

		outline: 2px var(--accent);
		outline-offset: 1px;
	}

	label {
		font-size: var(--font-s);
		color: var(--txt-tertiary);
	}
</style>
