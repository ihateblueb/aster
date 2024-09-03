<script>
	import PageFooter from '$lib/components/PageFooter.svelte';
	import store from '$lib/utils/store';

	import Sidebar from '$lib/components/Sidebar.svelte';
	import localstore from '$lib/utils/localstore';
	import Loading from '$lib/components/Loading.svelte';

	let defaultLeftWidgets = {
		top: ['instancelogo'],
		mid: ['guestnavigation'],
		btm: ['login']
	};
	let defaultRightWidgets = {
		top: ['welcome']
	};

	let activeRequests = 0;

	store.activeRequests.subscribe(async (value) => {
		activeRequests = value;
	});
</script>

<template>
	{#key activeRequests}
		{#if activeRequests > 0}
			<div class="activeRequestIndicator">
				<Loading size="16px" />
			</div>
		{/if}
	{/key}
	<div class="page">
		{#if localstore.get('a_token')}
			<Sidebar side="left" widgets={localstore.get('widgets_left')} />
		{:else}
			<Sidebar side="left" widgets={defaultLeftWidgets} />
		{/if}
		<main tabindex="-1">
			<slot></slot>
			<PageFooter />
		</main>
		{#if localstore.get('a_token')}
			<Sidebar side="right" widgets={localstore.get('widgets_right')} />
		{:else}
			<Sidebar side="right" widgets={defaultRightWidgets} />
		{/if}
	</div>
</template>

<style lang="scss" global>
	// this may say its imported incorrectly but Its Fine
	@import '../app';
</style>
