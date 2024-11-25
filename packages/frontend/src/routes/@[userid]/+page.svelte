<script lang="ts">
	import PageWrapper from '$lib/components/PageWrapper.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';

	import { createQuery } from '@tanstack/svelte-query';
	import Error from '$lib/components/Error.svelte';
	import Tab from '$lib/components/Tab.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import Avatar from '$lib/components/Avatar.svelte';
	import { IconUserCircle } from '@tabler/icons-svelte';
	import lookupUser from '$lib/api/user/lookup.js';

	export let data;

	const query = createQuery({
		queryKey: ['user'],
		retry: false,
		queryFn: async () => await lookupUser('@' + data.userid)
	});

	let title = $query.data
		? $query.data.displayName
			? $query.data.displayName
			: $query.data.username
				? $query.data.username
				: 'User'
		: 'User';
</script>

<PageHeader {title}>
	<svelte:fragment slot="icon">
		{#if $query.isSuccess}
			{#if $query.data && $query.data.avatar}
				<Avatar small size="var(--fs-xl)" user={$query.data} />
			{:else}
				<IconUserCircle size="var(--fs-lg)" />
			{/if}
		{/if}
	</svelte:fragment>
</PageHeader>

<PageWrapper tl>
	{#if $query.isLoading}
		<Loading />
	{:else if $query.isError}
		<Error
			status={$query.error.status}
			message={$query.error.message}
			server={Boolean($query.error.status)}
			retry={() => $query.refetch()}
		/>
	{:else if $query.isSuccess}
		<p>{JSON.stringify($query.data)}</p>
	{/if}
</PageWrapper>
