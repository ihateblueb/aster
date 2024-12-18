<script lang="ts">
	import ComposeWidget from '$lib/components/widget/ComposeWidget.svelte';
	import AccountWidget from '$lib/components/widget/AccountWidget.svelte';
	import DevelopmentWidget from '$lib/components/widget/DevelopmentWidget.svelte';
	import MetaWidget from '$lib/components/widget/MetaWidget.svelte';
	
	import localstore from '$lib/localstore';

	export let left = false;
	export let right = false;

	let widgets;
	if (left) localstore.get('sidebarLeft')
	if (right) localstore.get('sidebarRight')
</script>

{#snippet component(type: string)}
	{#if type === 'account'}
		<AccountWidget />
	{:else if type === 'compose'}
		<ComposeWidget />
	{:else if type === "development"}
		<DevelopmentWidget />
	{:else if type === "meta"}
		<MetaWidget />
	{/if}
{/snippet}

{#snippet body()}
	<div class="top">
		{#each widgets?.top as widget}
			{@render component(widget)}
		{/each}
	</div>
	<div class="bottom">
		{#each widgets?.bottom as widget}
			{@render component(widget)}
		{/each}
	</div>
{/snippet}

<div class="pageSidebar">
	<div class="body">
		{#key widgets}
			{@render body()}
		{/key}
	</div>
</div>

<style lang="scss" scoped>
	@media (max-width: 750px) {
		.pageSidebar {
			max-width: none !important;
			display: none;
		}
	}

	@media (max-width: 1355px) {
		.pageSidebar {
			max-width: 75px;
		}
	}

	.pageSidebar {
		.body {
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			gap: 10px;

			margin-top: 38px;
			padding: 12px;
			height: calc((100vh - 38px));

			.top {
				display: flex;
				flex-direction: column;
				gap: 10px;

				margin-bottom: auto;
				top: 0;

				overflow-y: scroll;
			}

			.bottom {
				display: flex;
				flex-direction: column;
				gap: 10px;

				margin-top: auto;
				bottom: 0;
			}
		}
	}
</style>
