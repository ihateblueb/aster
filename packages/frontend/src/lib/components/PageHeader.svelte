<script lang="ts">
	import { locale } from '$lib/locale';

	import Icon from './Icon.svelte';

	export let title = 'Page';
	export let icon = '';
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<template>
	<div class="pageHeader">
		<div class="left">
			{#if icon}
				<Icon
					name={icon}
					size="16px"
					color="inherit"
					margin="0px 8px 0px 0px"
				/>
			{/if}
			<p>{title}</p>
		</div>
		<div class="right">
			<slot></slot>
		</div>
	</div>
</template>

<style lang="scss">
	.pageHeader {
		display: flex;
		align-items: center;
		padding: 14px 16px;
		color: var(--txt-primary);
		background-color: var(--bg-primary-50);
		backdrop-filter: blur(16px);
		position: sticky;
		top: 0;
		z-index: 1000;

		.left {
			display: flex;
			align-items: center;
			flex-grow: 10;
		}
		.right {
			display: flex;
			align-items: center;
			flex-grow: 0;
		}
		p {
			font-weight: 600;
		}
	}
</style>
