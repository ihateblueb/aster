<script>
	import PageWrapper from '$lib/components/PageWrapper.svelte';
	import Timeline from '$lib/components/Timeline.svelte';
	import getEmojisUncategorized from '$lib/api/emojis/getUncategorized';

	let query = $state();
</script>

<PageWrapper>
	<Timeline
		type="emoji"
		queryKey="admin_emoji"
		queryFn={getEmojisUncategorized}
		noScroll
		bind:query
	/>
</PageWrapper>
