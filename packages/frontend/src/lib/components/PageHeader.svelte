<script>
	import { IconArrowLeft } from '@tabler/icons-svelte';
	import { page } from '$app/stores';
	import IconWrapper from '$lib/components/IconWrapper.svelte';
	import { goto } from '$app/navigation';

	export let title;

	console.log($page);

	let showBack = false;

	if ($page.url.pathname !== '/' && history.length > 2) showBack = true;
</script>

<div class="pageHeader">
	{#if showBack}
		<div class="back" on:click={() => goto('/')}>
			<IconWrapper>
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

		height: calc(50px - (14px * 2));
		max-height: calc(50px - (14px * 2));

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
			gap: 8px;
		}
	}
</style>
