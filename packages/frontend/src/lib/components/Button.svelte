<script lang="ts">
	export let type = '';
	export let to = '';
</script>

<template>
	{#if to}
		<a class="btn {type}" href={to} on:click>
			<slot></slot>
		</a>
	{:else}
		<button class="btn {type}" on:click>
			<slot></slot>
		</button>
	{/if}
</template>

<style lang="scss">
	.btn {
		cursor: pointer;
		user-select: none;
		display: inline-flex;
		align-content: center;
		background-color: var(--bg-tertiary);
		color: var(--txt-secondary);
		font-size: var(--font-m);
		text-decoration: none;
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
			width: fit-content;
		}

		&.header {
			border: none;
			background-color: transparent;
			padding: 0px;
			margin: 0px;
			margin-right: 5px;
		}

		&.accent {
			background-color: var(--accent);
		}

		&.success {
			background-color: var(--success);
		}

		&.warn {
			background-color: var(--warn);
		}

		&.danger {
			background-color: var(--danger);
		}

		outline: 2px var(--accent);
		outline-offset: 1px;
	}
</style>
