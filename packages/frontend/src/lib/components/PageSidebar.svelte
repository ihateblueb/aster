<script lang="ts">
	import ComposeWidget from '$lib/components/widget/ComposeWidget.svelte';
	import AccountWidget from '$lib/components/widget/AccountWidget.svelte';
	import DevelopmentWidget from '$lib/components/widget/DevelopmentWidget.svelte';
	import MetaWidget from '$lib/components/widget/MetaWidget.svelte';

	import localstore from '$lib/localstore';
	import NavigationWidget from '$lib/components/widget/NavigationWidget.svelte';

	let { left = false, right = false } = $props();

	let widgets = $state(undefined);

	if (left) widgets = localstore.get('sidebarLeft');
	if (right) widgets = localstore.get('sidebarRight');
</script>

{#snippet component(type)}
	{#if type === 'account'}
		<AccountWidget />
	{:else if type === 'compose'}
		<ComposeWidget />
	{:else if type === 'development'}
		<DevelopmentWidget />
	{:else if type === 'meta'}
		<MetaWidget />
	{:else if type === 'navigation'}
		<NavigationWidget />
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
		{@render body()}
	</div>
</div>

<style lang="scss" scoped>
	.pageSidebar {
		width: 100%;
		max-width: 350px;

		.body {
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			gap: 10px;

			margin-top: 38px + 12px;
			margin-bottom: 12px;
			padding: 0 12px;
			height: calc((100vh - (38px + (12px * 2))));

			overflow-y: scroll;
			overflow-x: hidden;

			.top {
				display: flex;
				flex-direction: column;
				gap: 10px;

				margin-bottom: auto;
				top: 0;
			}

			.bottom {
				position: sticky;
				display: flex;
				flex-direction: column;
				gap: 10px;

				margin-top: auto;
				bottom: 0;

				background: var(--bg1);
				padding: 12px 12px 0 12px;
			}
		}
	}

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
</style>
