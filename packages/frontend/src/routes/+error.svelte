<script>
	import { page } from '$app/stores';

	import PageWrapper from '$lib/components/PageWrapper.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';

	console.log($page.error);
</script>

<PageHeader title="Error"></PageHeader>

<PageWrapper centered>
	<h1>{$page.status}</h1>
	<h2>{$page.error.message}</h2>
</PageWrapper>
