<script lang="ts">
	import localstore from '$lib/localstore.js';
	import { createInfiniteQuery } from '@tanstack/svelte-query';
	import getNotifications from '$lib/api/notifications/get.js';
	import queryclient from '$lib/queryclient.js';
	import Error from '$lib/components/Error.svelte';
	import PageWrapper from '$lib/components/PageWrapper.svelte';
	import Button from '$lib/components/Button.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import Notification from '$lib/components/Notification.svelte';
	import Note from '$lib/components/Note.svelte';
	import store from '$lib/store.js';

	import {
		blur,
		crossfade,
		draw,
		fade,
		fly,
		scale,
		slide
	} from 'svelte/transition';

	import {
		backIn,
		backInOut,
		backOut,
		bounceIn,
		bounceInOut,
		bounceOut,
		circIn,
		circInOut,
		circOut,
		cubicIn,
		cubicInOut,
		cubicOut,
		elasticIn,
		elasticInOut,
		elasticOut,
		expoIn,
		expoInOut,
		expoOut,
		linear,
		quadIn,
		quadInOut,
		quadOut,
		quartIn,
		quartInOut,
		quartOut,
		quintIn,
		quintInOut,
		quintOut,
		sineIn,
		sineInOut,
		sineOut
	} from 'svelte/easing';
	import NoteSimple from '$lib/components/NoteSimple.svelte';
	import Report from '$lib/components/Report.svelte';
	import DriveFile from '$lib/components/DriveFile.svelte';

	let {
		type,
		smallItems = false,
		select = false,
		queryKey,
		queryFn,
		query = $bindable(),
		timeline = $bindable()
	} = $props();

	query = createInfiniteQuery({
		queryKey: [queryKey],
		retry: false,
		queryFn: async ({ pageParam }) => await queryFn(timeline, pageParam),
		initialPageParam: undefined,
		refetchOnWindowFocus: false,
		getNextPageParam: (lastPage) => {
			console.log(
				'[' + queryKey + '] lastTlObj',
				lastPage.at(-1).createdAt
			);
			return lastPage ? lastPage.at(-1).createdAt : undefined;
		}
	});

	let ws: undefined | WebSocket;
	store.websocket.subscribe((e) => {
		if (e) ws = e;
	});

	let additionalNotes: any[] = $state([]);

	if (ws && queryKey === 'timeline') {
		ws.send(`sub timeline:${timeline}`);

		ws.onmessage = (e) => {
			let message;
			try {
				message = JSON.parse(e.data);
			} catch {}

			console.log(
				message &&
					message.type === 'timeline:add' &&
					message.timeline === timeline &&
					message.note
			);

			if (
				message &&
				message.type === 'timeline:add' &&
				message.timeline === timeline &&
				message.note
			) {
				console.log('[' + queryKey + '] received ws note');
				additionalNotes.unshift(message.note);
			}
		};
	}

	$effect(() => {
		console.log(
			'[' +
				queryKey +
				'] clearing additional notes, new timeline ' +
				timeline
		);
		additionalNotes = [];
	});
</script>

{#if $query.isLoading}
	<Loading />
{:else if $query.isRefetching}
	<Loading />
{:else if $query.isError}
	<Error
		status={$query.error.status}
		message={$query.error.message}
		server={Boolean($query.error.status)}
		retry={() => $query.refetch()}
	/>
{:else if $query.isSuccess}
	{#each additionalNotes as note}
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
				{/if}
			</div>
		{/each}
	{/each}

	<div class="fetchMore">
		<Button centered on:click={() => $query.fetchNextPage()}>
			{#if $query.isFetching}
				<Loading size="var(--fs-lg)" />
			{:else if $query.hasNextPage}
				Load More
			{:else}
				No more
			{/if}
		</Button>
	</div>
{/if}

<style lang="scss">
	.fetchMore {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 8px;
	}
</style>
