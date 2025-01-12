<script>
	import { IconArrowLeft } from '@tabler/icons-svelte';
	import { page } from '$app/state';
	import IconWrapper from '$lib/components/IconWrapper.svelte';
	import { goto } from '$app/navigation';

	let { title } = $props();

	console.log(page);

	let showBack = $state(false);

	if (page.url.pathname !== '/' && history.length > 2) showBack = true;
</script>

<svelte:head>
	<title>{title + (title ? ' - ' : '') + page.url.host}</title>
</svelte:head>

<div class="pageHeader">
	{#if showBack}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div class="back" on:click={() => goto('/')} role="button" tabindex="0">
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

<style lang="scss" scoped>
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
