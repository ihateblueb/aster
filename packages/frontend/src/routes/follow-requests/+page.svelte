<script>
	import PageHeader from '$lib/components/PageHeader.svelte';
	import PageWrapper from '$lib/components/PageWrapper.svelte';
	import { IconHash, IconUserPlus } from '@tabler/icons-svelte';
</script>

<PageHeader title="Follow requests">
	<svelte:fragment slot="icon">
		<IconUserPlus size="18px" />
	</svelte:fragment>
</PageHeader>

<PageWrapper>Follow requests</PageWrapper>
