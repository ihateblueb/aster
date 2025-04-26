<script>
	import PageHeader from '$lib/components/PageHeader.svelte';
	import PageWrapper from '$lib/components/PageWrapper.svelte';
	import { IconBookmark } from '@tabler/icons-svelte';
	import localizedString from '$lib/localizedString';
</script>

<PageHeader title={localizedString('bookmarks')}>
	<svelte:fragment slot="icon">
		<IconBookmark size="18px" />
	</svelte:fragment>
</PageHeader>

<PageWrapper>Bookmarks</PageWrapper>
