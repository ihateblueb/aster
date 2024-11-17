<script>
	import {
		IconHome,
		IconLock,
		IconMail,
		IconWorld
	} from '@tabler/icons-svelte';

	export let visibility;
</script>

<div class="visibility">
	{#if visibility === 'public'}
		<IconWorld size="18px" />
	{:else if visibility === 'unlisted'}
		<IconHome size="18px" />
	{:else if visibility === 'followers'}
		<IconLock size="18px" />
	{:else if visibility === 'direct'}
		<IconMail size="18px" />
	{/if}
</div>

<style lang="scss" scoped>
	.visibility {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
