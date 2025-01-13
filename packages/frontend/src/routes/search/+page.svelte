<script>
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import PageWrapper from '$lib/components/PageWrapper.svelte';
	import { IconSearch } from '@tabler/icons-svelte';

	let value = $state('');
</script>

<PageHeader title="Search">
	<svelte:fragment slot="icon">
		<IconSearch size="var(--fs-lg)" />
	</svelte:fragment>
</PageHeader>

<PageWrapper>
	<Input
		wide
		nm
		placeholder="Search by ID, url, handle, or keyword..."
		bind:value
	/>
</PageWrapper>
