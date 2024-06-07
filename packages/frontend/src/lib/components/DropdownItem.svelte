<script>
	import { goto } from '$app/navigation';

	export let type = 'regular';
	export let to;
</script>

<template>
	{#if to}
		<button class="dropdownItem" on:click={() => goto(to)}>
			<slot></slot>
		</button>
	{:else}
		<button class={'dropdownItem ' + type}>
			<slot></slot>
		</button>
	{/if}
</template>

<style lang="scss">
	.dropdownItem {
		display: flex;
		align-items: center;
		padding: 6px 8px;
		width: 100%;

		background-color: transparent;
		color: inherit;
		font-family: inherit;
		font-size: inherit;
		border-radius: 6px;
		border: none;

		cursor: pointer;

		&.danger {
			color: var(--danger);

			&:hover {
				color: var(--danger);
				background-color: var(--danger-20);
			}
		}

		&:hover {
			color: var(--accent);
			background-color: var(--accent-20);
		}
	}
</style>
