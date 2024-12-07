<script lang="ts">
	import PageWrapper from '$lib/components/PageWrapper.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';

	import { createQuery } from '@tanstack/svelte-query';
	import Error from '$lib/components/Error.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import { IconNote } from '@tabler/icons-svelte';
	import getNote from '$lib/api/note/get.js';
	import Note from '$lib/components/Note.svelte';
	import Tab from '$lib/components/Tab.svelte';

	let props = $props();

	console.log(props.data);

	const query = createQuery({
		queryKey: ['user'],
		retry: false,
		queryFn: async () => await getNote(props.data.noteid)
	});

	let selectedTab = $state('replies');

	function updateTab(tab: string) {
		selectedTab = tab;
	}
</script>

<PageHeader
	title={$query.data
		? $query.data.user
			? $query.data.user.displayName
				? 'Note by ' + $query.data.user.displayName
				: 'Note by ' + $query.data.user.username
			: 'Note'
		: 'Note'}
>
	<svelte:fragment slot="icon">
		<IconNote size="var(--fs-lg)" />
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
		<Note note={$query.data} expanded />
		<div class="tabs">
			<Tab
				selected={selectedTab === 'replies'}
				on:click={() => updateTab('replies')}
				short>Replies</Tab
			>
			<Tab
				selected={selectedTab === 'repeats'}
				on:click={() => updateTab('repeats')}
				short>Repeats</Tab
			>
			<Tab
				selected={selectedTab === 'reactions'}
				on:click={() => updateTab('reactions')}
				short>Reactions</Tab
			>
		</div>
	{/if}
</PageWrapper>

<style lang="scss" scoped>
	.tabs {
		display: flex;
		align-items: center;
		// +10 for the -10 margin, then 8px tl pagewrapper margin
		width: calc(100% + 18px);
		box-sizing: border-box;

		margin: 0 -10px;

		gap: 15px;
		height: 48px;
		padding: 0 20px;

		border-bottom: 1px solid var(--bg3);
	}
</style>
