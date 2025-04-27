<script lang="ts">
	import { createInfiniteQuery } from '@tanstack/svelte-query';

	import Error from '$lib/components/Error.svelte';
	import Button from '$lib/components/Button.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import Notification from '$lib/components/Notification.svelte';
	import Note from '$lib/components/Note.svelte';

	import { fly, slide } from 'svelte/transition';
	import { backOut } from 'svelte/easing';

	import NoteSimple from '$lib/components/NoteSimple.svelte';
	import Report from '$lib/components/Report.svelte';
	import DriveFile from '$lib/components/DriveFile.svelte';
	import ws from '$lib/websocket.svelte';
	import localstore from '$lib/localstore';
	import EmojiCard from '$lib/components/EmojiCard.svelte';
	import FollowRequest from '$lib/components/FollowRequest.svelte';
	import LocalizedString from '$lib/components/LocalizedString.svelte';

	let {
		type,
		smallItems = false,
		select = false,
		queryKey,
		queryFn,
		noScroll = false,
		query = $bindable(),
		timeline = $bindable(),
		additional = $bindable({
			notes: [],
			notifications: []
		})
	} = $props();

	query = createInfiniteQuery({
		queryKey: [queryKey],
		retry: false,
		queryFn: async ({ pageParam }) =>
			timeline || timeline === ''
				? await queryFn(timeline, pageParam)
				: await queryFn(pageParam),
		initialPageParam: undefined,
		getNextPageParam: (lastPage) => {
			console.log(
				'[' + queryKey + '] lastTlObj',
				lastPage?.at(-1).createdAt
			);
			return lastPage ? lastPage.at(-1).createdAt : undefined;
		}
	});

	function infiniteLoading(e) {
		const observer = new IntersectionObserver(async (entries) => {
			if (entries[0].isIntersecting) $query.fetchNextPage();
		});

		observer.observe(e);
	}

	if (ws && queryKey === 'timeline') {
		ws.addEventListener('open', () => {
			ws?.send(`sub timeline:${timeline}`);
		});

		ws.addEventListener('message', (e) => {
			let message;
			try {
				message = JSON.parse(e.data);
			} catch {}

			let addToTl =
				message &&
				message.type === 'timeline:add' &&
				message.timeline === timeline &&
				message.note;

			if (addToTl) {
				console.log('[' + queryKey + '] received ws note');
				additional.notes.unshift(message.note);
			}
		});
	}

	if (
		ws &&
		(queryKey === 'notifications' || queryKey === 'notifications-widget')
	) {
		ws.addEventListener('message', (e) => {
			let message;
			try {
				message = JSON.parse(e.data);
			} catch {}

			let addToTl =
				message &&
				message.type === 'notification:add' &&
				message.notification;

			if (addToTl) {
				console.log('[' + queryKey + '] received ws notification');
				additional.notifications.unshift(message.notification);
			}
		});
	}
</script>

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
	{#each additional.notes as note}
		<div
			in:fly|global={{
				y: -10,
				duration: 350,
				easing: backOut
			}}
		>
			<Note {note} />
		</div>
	{/each}
	{#each additional.notifications as notification}
		<div
			in:fly|global={{
				y: -10,
				duration: 350,
				easing: backOut
			}}
		>
			<Notification {notification} />
		</div>
	{/each}

	{#each $query.data.pages as results}
		{#each results as object}
			<div
				in:fly|global={{
					y: -10,
					duration: 350,
					easing: backOut
				}}
			>
				{#if type === 'note'}
					{#if smallItems}
						<NoteSimple note={object} nomargin nobg />
					{:else}
						<Note note={object} />
					{/if}
				{:else if type === 'notification'}
					<Notification notification={object} small={smallItems} />
				{:else if type === 'report'}
					<Report report={object} />
				{:else if type === 'drive'}
					<DriveFile file={object} {select} />
				{:else if type === 'emoji'}
					<EmojiCard emoji={object} />
				{:else if type === 'followRequest'}
					<FollowRequest followRequest={object} />
				{/if}
			</div>
		{/each}
	{/each}

	{#if !noScroll}
		<div class="fetchMore">
			{#if !localstore.getParsed('fetchMoreOnScroll')}
				{#if $query.isFetchingNextPage}
					<Button centered on:click={() => $query.fetchNextPage()}>
						<Loading size="18px" massive={false} />
					</Button>
				{:else if $query.hasNextPage}
					<Button centered on:click={() => $query.fetchNextPage()}>
						Load more
					</Button>
				{:else}
					<LocalizedString id="no-more" />
				{/if}
			{:else}
				<div use:infiniteLoading></div>
				{#if $query.hasNextPage}
					<Loading size="18px" massive={false} />
				{:else}
					No more
				{/if}
			{/if}
		</div>
	{/if}
{/if}

<style lang="scss">
	.additional {
		width: 100%;
		box-sizing: border-box;
		padding: 12px 14px;

		color: var(--tx3);
		font-style: italic;
		text-align: center;
	}

	.scroller {
		height: 100%;
		width: 100%;
		overflow: auto;
		box-sizing: border-box;
	}

	.fetchMore {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 75px;
		padding: 8px;
	}
</style>
