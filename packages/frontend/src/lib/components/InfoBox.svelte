<script lang="ts">
	export let type = 'info';
</script>

<template>
	{#if type === 'success'}
		<div class="infoBox success">
			<slot></slot>
		</div>
	{:else if type === 'info'}
		<div class="infoBox info">
			<slot></slot>
		</div>
	{:else if type === 'warn'}
		<div class="infoBox warn">
			<slot></slot>
		</div>
	{:else if type === 'danger'}
		<div class="infoBox danger">
			<slot></slot>
		</div>
	{/if}
</template>

<style lang="scss">
	.infoBox {
		border-radius: var(--border-m);
		padding: 6px 12px;
		margin: 10px 0px 10px 0px;

		&.success {
			background-color: var(--success-20);
			color: var(--success);
		}
		&.info {
			background-color: var(--accent-20);
			color: var(--accent);
		}
		&.warn {
			background-color: var(--warn-20);
			color: var(--warn);
		}
		&.danger {
			background-color: var(--danger-20);
			color: var(--danger);
		}
	}
</style>
