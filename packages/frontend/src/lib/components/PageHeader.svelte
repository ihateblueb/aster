<script lang="ts">
	import { locale } from '$lib/locale';

	export let title = 'Page';
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<template>
	<div class="pageHeader">
		<p>{title}</p>
	</div>
</template>

<style lang="scss">
	.pageHeader {
		display: flex;
		align-items: center;
		padding: 12px 16px;
		background-color: var(--bg-primary-50);
		backdrop-filter: blur(6px);
		z-index: 2;
		position: relative;

		p {
			font-weight: 600;
		}
	}
</style>
