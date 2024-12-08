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
	import NoteHeader from '$lib/components/NoteHeader.svelte';
	import UserCard from '$lib/components/UserCard.svelte';

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
				selected={selectedTab === 'likes'}
				on:click={() => updateTab('likes')}
				short>Likes</Tab
			>
			<Tab
				selected={selectedTab === 'reactions'}
				on:click={() => updateTab('reactions')}
				short>Reactions</Tab
			>
		</div>
		<div class="bottom">
			{#if selectedTab === 'replies'}
				{#if $query.data.replies && $query.data.replies.length >= 1}
					{#each $query.data.replies as reply}
						reply
					{/each}
				{:else}
					<p>Nobody's replied to this yet.</p>
				{/if}
			{:else if selectedTab === 'repeats'}
				{#if $query.data.repeats && $query.data.repeats.length >= 1}
					{#each $query.data.repeats as repeat}
						{#if repeat.content}
							<Note note={repeat} />
						{:else}
							<UserCard
								user={repeat.user}
								time={repeat.createdAt}
							/>
						{/if}
					{/each}
				{:else}
					<p>Nobody's repeated this yet.</p>
				{/if}
			{:else if selectedTab === 'likes'}
				{#if $query.data.likes && $query.data.likes.length >= 1}
					{#each $query.data.likes as like}
						<UserCard user={like.user} time={like.createdAt} />
					{/each}
				{:else}
					<p>Nobody's liked this yet.</p>
				{/if}
			{:else if selectedTab === 'reactions'}
				{#if $query.data.reactions && $query.data.reactions.length >= 1}
					{#each $query.data.reactions as react}
						<UserCard user={react.user} time={react.createdAt} />
					{/each}
				{:else}
					<p>Nobody's reacted to this yet.</p>
				{/if}
			{/if}
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
	.bottom {
		margin-top: 8px;

		.userCard {
			padding: 16px;
			transition: 0.1s;

			&:hover {
				border-radius: var(--br-md);
				background-color: var(--bg3-25);
			}
		}
	}
</style>
