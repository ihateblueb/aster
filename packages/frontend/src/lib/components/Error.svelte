<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { IconReload } from '@tabler/icons-svelte';

	let { status = 0, message = '', server = false, retry } = $props();
</script>

<div class="error">
	{#if server}
		<h1>{status}</h1>
	{:else}
		<h1>Uh oh!</h1>
	{/if}
	<p>{message}</p>

	{#if retry}
		<Button rounded on:click={retry}>
			<IconReload size="18px" />
			Retry
		</Button>
	{/if}
</div>

<style lang="scss" scoped>
	.error {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 10px;
		height: 100%;
		width: 100%;

		h1 {
			margin-bottom: 5px;
		}

		p {
			font-size: var(--fs-lg);
			line-height: 1;
		}
	}
</style>
