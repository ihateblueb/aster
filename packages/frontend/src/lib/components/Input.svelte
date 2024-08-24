<script lang="ts">
	import { v4 as uuidv4 } from 'uuid';

	let id = uuidv4();

	export let big = false;
	export let type = '';
	export let formtype = '';
	export let placeholder = '';
	export let value = '';
	export let label = '';

	function formType(node) {
		if (formtype) {
			node.type = formtype;
		}
	}
</script>

<template>
	{#if big}
		{#if label}
			<label class="_b4A92SY" for={id}>{label}</label>
		{/if}
		<textarea
			{id}
			class={'ipt _b4A92SY big ' + type}
			use:formType
			{placeholder}
			bind:value
		/>
	{:else}
		{#if label}
			<label class="_b4A92SY" for={id}>{label}</label>
		{/if}
		<input
			{id}
			class={'ipt _b4A92SY ' + type}
			use:formType
			{placeholder}
			bind:value
		/>
	{/if}
</template>
