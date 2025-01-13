<script>
	import PageHeader from '$lib/components/PageHeader.svelte';
	import PageWrapper from '$lib/components/PageWrapper.svelte';
	import { IconHash } from '@tabler/icons-svelte';
</script>

<PageHeader title="Explore">
	<svelte:fragment slot="icon">
		<IconHash size="var(--fs-lg)" />
	</svelte:fragment>
</PageHeader>

<PageWrapper>Explore</PageWrapper>
