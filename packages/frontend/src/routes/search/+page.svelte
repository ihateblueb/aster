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
		<IconSearch size="18px" />
	</svelte:fragment>
</PageHeader>

<PageWrapper>
	<div class="top">
		<Input
			wide
			nm
			placeholder="Search by ID, url, handle, or keyword..."
			bind:value
		/>
		<Button nm>Go</Button>
	</div>
</PageWrapper>

<style lang="scss">
	.top {
		display: flex;
		align-items: center;
		box-sizing: border-box;
		width: 100%;
		gap: 10px;
	}
</style>
