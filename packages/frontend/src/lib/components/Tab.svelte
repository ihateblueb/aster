<script>
	import { slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import Button from './Button.svelte';
	import Icon from './Icon.svelte';

	export let icon;
	export let selected;
	export let label;
</script>

<template>
	<Button type={'header' + (selected ? ' selected' : '')} on:click>
		{#if icon}
			<Icon name={icon} size="16px" />
		{/if}
		{#if selected}
			<span
				class="label"
				transition:slide={{
					axis: 'x',
					easing: cubicInOut,
					duration: 250
				}}
			>
				{label}
			</span>
		{/if}
	</Button>
</template>

<style lang="scss">
	.label {
		position: relative;
		font-size: 12px;
		font-weight: 600;
		overflow: clip;
		padding-left: 4px;
	}
</style>
