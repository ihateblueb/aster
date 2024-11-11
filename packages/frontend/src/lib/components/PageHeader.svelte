<script>
	import { IconArrowLeft } from '@tabler/icons-svelte';
	import { page } from '$app/stores';
	import IconWrapper from '$lib/components/IconWrapper.svelte';

	export let title;

	console.log($page);

	let showBack = false;

	if ($page.url.pathname !== '/' && history.length > 2) showBack = true;
</script>

<div class="pageHeader">
	{#if showBack}
		<div class="back">
			<IconWrapper on:click={() => window.history.back()}>
				<IconArrowLeft size="var(--fs-md)" />
			</IconWrapper>
		</div>
	{/if}
	<div class="left">
		<div class="icon">
			<slot name="icon" />
		</div>

		{title}
	</div>
	<div class="right">
		<slot />
	</div>
</div>

<style lang="scss">
	.pageHeader {
		display: flex;

		padding: 14px 18px;
		background: var(--bg1);
		max-height: 50px;

		.back {
			display: flex;
			align-items: center;
			margin-right: 8px;
			cursor: pointer;
		}

		.icon {
			display: flex;
			align-items: center;
			margin-right: 8px;
		}

		.left {
			display: flex;
			align-items: center;
			font-weight: 500;
			flex-grow: 1;
		}

		.right {
			display: flex;
			align-items: center;
			gap: 12px;
		}
	}
</style>
