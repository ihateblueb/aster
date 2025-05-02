<script>
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import PageWrapper from '$lib/components/PageWrapper.svelte';
	import { IconSearch } from '@tabler/icons-svelte';
	import localizedString from '$lib/localizedString';
	import LocalizedString from '$lib/components/LocalizedString.svelte';
	import { createInfiniteQuery, createQuery } from '@tanstack/svelte-query';
	import search from '$lib/api/search.js';
	import Loading from '$lib/components/Loading.svelte';
	import Error from '$lib/components/Error.svelte';
	import UserCard from '$lib/components/UserCard.svelte';
	import Note from '$lib/components/Note.svelte';
	import { goto } from '$app/navigation';

	import { fly } from 'svelte/transition';
	import { backOut } from 'svelte/easing';
	import localstore from '$lib/localstore.js';

	let value = $state('');

	const query = createInfiniteQuery({
		queryKey: ['search'],
		retry: false,
		queryFn: ({ pageParam }) => {
			if (value.length <= 0) return [undefined];
			return search(value, pageParam).then((e) => {
				if (e.redirect) redirect(e.results[0]);
				return e;
			});
		},
		initialPageParam: undefined,
		getNextPageParam: (lastPage) => {
			try {
				let createdAt = lastPage
					? lastPage?.results?.at(-1)?.object?.createdAt
					: undefined;
				console.log('[search] lastTlObj', createdAt);
				return createdAt;
			} catch {
				return undefined;
			}
		}
	});

	function infiniteLoading(e) {
		const observer = new IntersectionObserver(async (entries) => {
			if (entries[0].isIntersecting) $query.fetchNextPage();
		});

		observer.observe(e);
	}

	function redirect(result) {
		if (result.type === 'user') {
			let user = result.object;
			goto('/@' + user.username + (!user.local ? '@' + user.host : ''));
		} else if (result.type === 'note') {
			let note = result.object;
			goto('/notes/' + note.id);
		}
	}

	function go() {
		$query.refetch();
	}
</script>

<PageHeader title={localizedString('search')}>
	<svelte:fragment slot="icon">
		<IconSearch size="18px" />
	</svelte:fragment>
</PageHeader>

<PageWrapper>
	<div class="top">
		<div class="searchbar">
			<Input
				wide
				nm
				placeholder={localizedString('search-prompt')}
				bind:value
			/>
		</div>
		<Button nm on:click={go}>
			<LocalizedString id="go" />
		</Button>
	</div>

	<!-- yes, this is repeat code. this is only one spot where ill repeat the timeline
	 	 like this because it would have sucked worse to implement it into that component -->

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
		{#each $query.data?.pages as results}
			{#each results?.results as result}
				<div
					in:fly|global={{
						y: -10,
						duration: 350,
						easing: backOut
					}}
				>
					{#if result?.type === 'user'}
						<UserCard user={result?.object} />
					{:else if result?.type === 'note'}
						<Note note={result?.object} />
					{/if}
				</div>
			{/each}
		{/each}

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
</PageWrapper>

<style lang="scss">
	.top {
		display: flex;
		align-items: center;
		box-sizing: border-box;
		width: 100%;
		gap: 10px;
		margin-bottom: 10px;

		.searchbar {
			flex-grow: 1;
		}
	}

	.fetchMore {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 75px;
		padding: 8px;
	}
</style>
