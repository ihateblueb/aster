<script>
	import PageHeader from '$lib/components/PageHeader.svelte';
	import PageWrapper from '$lib/components/PageWrapper.svelte';
	import { IconHash } from '@tabler/icons-svelte';
	import localizedString from '$lib/localizedString';
</script>

<PageHeader title={localizedString('explore')}>
	<svelte:fragment slot="icon">
		<IconHash size="18px" />
	</svelte:fragment>
</PageHeader>

<PageWrapper>Explore</PageWrapper>
