<script>
	import PageWrapper from '$lib/components/PageWrapper.svelte';
	import Timeline from '$lib/components/Timeline.svelte';
	import getEmojis from '$lib/api/emojis/get';

	let query = $state();
</script>

<PageWrapper>
	<Timeline
		type="emoji"
		queryKey="admin_emoji"
		queryFn={getEmojis}
		noScroll
		bind:query
	/>
</PageWrapper>
