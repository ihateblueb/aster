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
	import UserCard from '$lib/components/UserCard.svelte';
	import queryClient from '$lib/queryclient.js';
	import getNoteContext from '$lib/api/note/context.js';
	import Button from '$lib/components/Button.svelte';
	import { navigating } from '$app/state';
	import NoteSimple from '$lib/components/NoteSimple.svelte';
	import LocalizedString from '$lib/components/LocalizedString.svelte';
	import localizedString from '$lib/localizedString';

	let props = $props();

	console.log(props.data);
	queryClient.clear();

	const query = createQuery({
		queryKey: ['note_' + props.data.noteid],
		retry: false,
		queryFn: async () => await getNote(props.data.noteid)
	});

	const contextQuery = createQuery({
		queryKey: ['context_' + props.data.noteid],
		retry: false,
		queryFn: async () => await getNoteContext(props.data.noteid)
	});

	let selectedTab = $state('replies');

	function updateTab(tab: string) {
		selectedTab = tab;
	}

	$effect(() => {
		if (props.data.noteid !== $query.data?.id) {
			$query.refetch();
			$contextQuery.refetch();
			selectedTab = 'replies';
		}
	});
</script>

<PageHeader
	title={$query.data
		? $query.data.user
			? $query.data.user.displayName
				? localizedString('note-by', {
						name: $query.data.user.displayName
					})
				: localizedString('note-by', {
						name: $query.data.user.username
					})
			: localizedString('note')
		: localizedString('note')}
>
	<svelte:fragment slot="icon">
		<IconNote size="18px" />
	</svelte:fragment>
</PageHeader>

<PageWrapper tl>
	{#if $query.isLoading}
		<Loading massive />
	{:else if $query.isError}
		<Error
			status={$query.error.status}
			message={$query.error.message}
			server={Boolean($query.error.status)}
			retry={() => $query.refetch()}
		/>
	{:else if $query.isSuccess}
		{#if $query.data.replyingTo}
			<Note note={$query.data.replyingTo} />
		{/if}
		<Note note={$query.data} expanded />
		<div class="tabs">
			<Tab
				selected={selectedTab === 'replies'}
				on:click={() => updateTab('replies')}
			>
				<LocalizedString id="replies" />
			</Tab>
			<Tab
				selected={selectedTab === 'repeats'}
				on:click={() => updateTab('repeats')}
			>
				<LocalizedString id="repeats" />
			</Tab>
			<Tab
				selected={selectedTab === 'likes'}
				on:click={() => updateTab('likes')}
			>
				<LocalizedString id="likes" />
			</Tab>
			<Tab
				selected={selectedTab === 'reactions'}
				on:click={() => updateTab('reactions')}
			>
				<LocalizedString id="reactions" />
			</Tab>
		</div>
		<div class="bottom">
			{#if selectedTab === 'replies'}
				{#if $contextQuery.isLoading}
					<Loading />
				{:else if $contextQuery.isError}
					<Error
						status={$contextQuery.error.status}
						message={$contextQuery.error.message}
						server={Boolean($contextQuery.error.status)}
						retry={() => $contextQuery.refetch()}
					/>
				{:else if $contextQuery.isSuccess}
					{#if $contextQuery.data && $contextQuery.data.length > 0}
						{#snippet renderReplies(replies, depth)}
							{#each replies as reply}
								<div class="replies">
									<div class="level">
										{#if depth > 1}
											<div class="threadLine"></div>
											{#if depth > 2}
												<div class="threadLine"></div>
												{#if depth > 3}
													<div
														class="threadLine"
													></div>
													{#if depth > 4}
														<div
															class="threadLine"
														></div>
														{#if depth > 5}
															<div
																class="threadLine"
															></div>
														{/if}
													{/if}
												{/if}
											{/if}
										{/if}
										<div class="note">
											<Note note={reply} />
										</div>
									</div>
									{#if depth <= 5}
										{@render renderReplies(
											reply?.replies,
											depth + 1
										)}
										{#if depth === 5}
											<Button to={'/notes/' + reply.id}>
												Continue reading thread...
											</Button>
										{/if}
									{/if}
								</div>
							{/each}
						{/snippet}

						{@render renderReplies($contextQuery.data, 1)}
					{:else}
						<div class="nothingHere">
							<LocalizedString id="nobody-replied-yet" />
						</div>
					{/if}
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
					<div class="nothingHere">
						<LocalizedString id="nobody-repeated-yet" />
					</div>
				{/if}
			{:else if selectedTab === 'likes'}
				{#if $query.data.likes && $query.data.likes.length >= 1}
					{#each $query.data.likes as like}
						<UserCard user={like.user} time={like.createdAt} />
					{/each}
				{:else}
					<div class="nothingHere">
						<LocalizedString id="nobody-liked-yet" />
					</div>
				{/if}
			{:else if selectedTab === 'reactions'}
				{#if $query.data.reactions && $query.data.reactions.length >= 1}
					{#each $query.data.reactions as react}
						<UserCard user={react.user} time={react.createdAt} />
					{/each}
				{:else}
					<div class="nothingHere">
						<LocalizedString id="nobody-reacted-yet" />
					</div>
				{/if}
			{/if}
		</div>
	{/if}
</PageWrapper>

<style lang="scss" scoped>
	.ancestor {
		padding: 14px;
	}
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

		.nothingHere {
			display: flex;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;
			padding: 25px 0;
			height: 100%;
			width: 100%;

			p {
				color: var(--tx3);
			}
		}

		.userCard {
			padding: 16px;
			transition: 0.1s;

			&:hover {
				border-radius: var(--br-md);
				background-color: var(--bg3-25);
			}
		}

		.replies {
			.level {
				display: flex;

				.threadLine {
					box-sizing: border-box;
					margin-right: 10px;
					border-left: 2px solid var(--bg4);
				}

				.note {
					flex-grow: 1;
				}
			}
		}
	}
</style>
