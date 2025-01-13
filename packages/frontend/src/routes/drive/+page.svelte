<script>
	import PageHeader from '$lib/components/PageHeader.svelte';
	import PageWrapper from '$lib/components/PageWrapper.svelte';
	import { IconCloud } from '@tabler/icons-svelte';
</script>

<PageHeader title="Drive">
	<svelte:fragment slot="icon">
		<IconCloud size="var(--fs-lg)" />
	</svelte:fragment>
</PageHeader>

<PageWrapper>Drive</PageWrapper>
