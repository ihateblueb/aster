<script lang="ts">
	export let type = 'info';
</script>

<template>
	{#if type === 'success'}
		<div class="infoBox _1bF30yb success">
			<slot></slot>
		</div>
	{:else if type === 'info'}
		<div class="infoBox _1bF30yb info">
			<slot></slot>
		</div>
	{:else if type === 'warn'}
		<div class="infoBox _1bF30yb warn">
			<slot></slot>
		</div>
	{:else if type === 'danger'}
		<div class="infoBox _1bF30yb danger">
			<slot></slot>
		</div>
	{/if}
</template>
