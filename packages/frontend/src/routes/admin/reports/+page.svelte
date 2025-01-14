<script>
	import PageWrapper from '$lib/components/PageWrapper.svelte';
	import Timeline from '$lib/components/Timeline.svelte';
	import getAdminReports from '$lib/api/admin/reports/get';

	let query = $state();
</script>

<PageWrapper>
	<Timeline
		type="report"
		queryKey="reports"
		queryFn={getAdminReports}
		bind:query
	/>
</PageWrapper>
