<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { IconBug, IconReload, IconUserPlus } from '@tabler/icons-svelte';
	import LocalizedString from '$lib/components/LocalizedString.svelte';

	let { status = 0, message = '', server = false, retry } = $props();
</script>

<div class="error">
	{#if server}
		<h1>{status}</h1>
	{:else}
		<h1>
			<LocalizedString id="something-went-wrong" />
		</h1>
	{/if}
	<p>{message}</p>

	<div class="btns">
		{#if retry}
			<Button rounded on:click={retry}>
				<IconReload size="18px" />
				<LocalizedString id="retry" />
			</Button>
		{/if}
		{#if !server}
			<Button rounded to="https://github.com/ihateblueb/aster/issues">
				<IconBug size="18px" />
				<LocalizedString id="report-issue" />
			</Button>
		{/if}
	</div>
</div>

<style lang="scss" scoped>
	.error {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 10px;

		padding: 0 20px;
		box-sizing: border-box;
		height: 100%;
		width: 100%;

		h1 {
			margin-bottom: 5px;
		}

		p {
			font-size: var(--fs-lg);
			line-height: 1;
		}

		.btns {
			display: flex;
			gap: 10px;
		}
	}
</style>
