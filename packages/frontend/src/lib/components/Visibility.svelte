<script>
	import {
		IconHome,
		IconLock,
		IconMail,
		IconWorld
	} from '@tabler/icons-svelte';

	let { visibility } = $props();
</script>

<div class="visibility">
	{#if visibility === 'public'}
		<IconWorld size="var(--fs-lg)" />
	{:else if visibility === 'unlisted'}
		<IconHome size="var(--fs-lg)" />
	{:else if visibility === 'followers'}
		<IconLock size="var(--fs-lg)" />
	{:else if visibility === 'direct'}
		<IconMail size="var(--fs-lg)" />
	{/if}
</div>

<style lang="scss" scoped>
	.visibility {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
