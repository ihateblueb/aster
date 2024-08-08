<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import PageFooter from '$lib/components/PageFooter.svelte';

	import Sidebar from '$lib/components/Sidebar.svelte';
	import Store from '$lib/utils/Store';

	let defaultLeftWidgets = {
		top: ['instancelogo'],
		mid: ['guestnavigation'],
		btm: ['login']
	};
	let defaultRightWidgets = {
		top: ['welcome']
	};
</script>

<template>
	<div class="page">
		{#if Store.get('a_token')}
			<Sidebar side="left" widgets={Store.get('widgets_left')} />
		{:else}
			<Sidebar side="left" widgets={defaultLeftWidgets} />
		{/if}
		<main>
			<slot></slot>
			<PageFooter />
		</main>
		{#if Store.get('a_token')}
			<Sidebar side="right" widgets={Store.get('widgets_right')} />
		{:else}
			<Sidebar side="right" widgets={defaultRightWidgets} />
		{/if}
	</div>
</template>

<style lang="scss" global>
	// this may say its imported incorrectly but Its Fine
	@import '../app';
</style>
