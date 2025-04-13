<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import PageWrapper from '$lib/components/PageWrapper.svelte';
	import { IconUserPlus } from '@tabler/icons-svelte';
	import Timeline from '$lib/components/Timeline.svelte';
	import localstore from '$lib/localstore.js';
	import queryclient from '$lib/queryclient.js';
	import getFollowRequests from '$lib/api/follow-requests/get.js';

	let query: any = $state();

	function updateTimeline(to: string) {
		queryclient.clear();
		$query.refetch();
	}
</script>

<PageHeader title="Follow requests">
	<svelte:fragment slot="icon">
		<IconUserPlus size="18px" />
	</svelte:fragment>
</PageHeader>

<PageWrapper tl>
	<Timeline
		type="followRequest"
		queryKey="followRequests"
		queryFn={getFollowRequests}
		bind:query
	/>
</PageWrapper>
