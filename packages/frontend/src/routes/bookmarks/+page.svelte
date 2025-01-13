<script>
	import PageHeader from '$lib/components/PageHeader.svelte';
	import PageWrapper from '$lib/components/PageWrapper.svelte';
	import { IconBookmark } from '@tabler/icons-svelte';
</script>

<PageHeader title="Bookmarks">
	<svelte:fragment slot="icon">
		<IconBookmark size="var(--fs-lg)" />
	</svelte:fragment>
</PageHeader>

<PageWrapper>Bookmarks</PageWrapper>
