<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import Mfm from '$lib/components/Mfm.svelte';
	import UserCard from '$lib/components/UserCard.svelte';
	import { IconLogin, IconUserPlus } from '@tabler/icons-svelte';
	import { createInfiniteQuery, createQuery } from '@tanstack/svelte-query';
	import getTimeline from '$lib/api/timeline.js';
	import Error from '$lib/components/Error.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import Note from '$lib/components/Note.svelte';
	import getMeta from '$lib/api/meta/get.js';

	const meta = createQuery({
		queryKey: ['meta'],
		retry: false,
		queryFn: async () => await getMeta()
	});

	const query = createInfiniteQuery({
		queryKey: ['welcome-timeline'],
		retry: false,
		queryFn: async ({ pageParam }) => await getTimeline('local', pageParam),
		initialPageParam: undefined,
		getNextPageParam: (lastPage) => {
			console.log('lastNote', lastPage.at(-1).createdAt);
			return lastPage ? lastPage.at(-1).createdAt : undefined;
		}
	});
</script>

<div class="welcome">
	<div class="first">
		{#if $meta.data}
			<h1>{$meta.data.name ?? $page.url.host}</h1>
		{/if}

		<div class="bio">
			{#if $meta.data}
				{#if $meta.data.description}
					<Mfm content={$meta.data.description} />
				{:else}
					<p class="missing">
						There's nothing written about this instance yet.
					</p>
				{/if}
			{/if}
		</div>

		<div class="bottom">
			{#if $meta.data}
				<div class="admin">
					<p>Instance administrated by</p>
					{#each $meta.data.admins as admin}
						<UserCard user={admin} />
					{/each}
				</div>
			{/if}
			<div class="buttons">
				<Button accent centered wide to="/login">
					<IconLogin size="var(--fs-lg)" />
					Login
				</Button>
				<Button centered wide to="/register">
					<IconUserPlus size="var(--fs-lg)" />
					Register
				</Button>
			</div>
		</div>
	</div>
	<div class="second">
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
			{#each $query.data.pages as results}
				{#each results as note}
					<Note {note} />
				{/each}
			{/each}
			<Button
				on:click={() => $query.fetchNextPage()}
				disabled={!$query.hasNextPage || $query.isFetchingNextPage}
			>
				{#if $query.isFetching}
					Loading more...
				{:else if $query.hasNextPage}
					Load More
				{:else}
					Nothing more to load
				{/if}
			</Button>
		{/if}
	</div>
</div>

<style lang="scss" scoped>
	.welcome {
		display: flex;
		flex-direction: row;

		height: 100vh;
		width: 100%;
		max-width: 1000px;

		overflow-y: hidden;

		.first {
			display: flex;
			align-items: center;
			flex-direction: column;

			padding: 35px 25px;

			max-width: 350px;
			width: 100%;
			min-width: 275px;

			.bio {
				margin-top: 10px;
				width: 100%;

				overflow-y: scroll;
				flex-grow: 1;

				.missing {
					font-style: italic;
					color: var(--tx3);
					text-align: center;
				}
			}

			.bottom {
				display: flex;
				justify-content: end;
				flex-direction: column;
				width: 100%;

				gap: 10px;
				margin-top: 10px;

				.admin {
					p {
						margin-bottom: 10px;
					}
				}

				.buttons {
					display: flex;
					align-items: center;
					gap: 10px;
				}
			}
		}

		.second {
			height: 100%;
			width: 100%;
			min-width: 475px;

			box-sizing: border-box;

			padding: 25px;
			overflow-y: scroll;
		}
	}

	// 275+475+(25*4)
	@media (max-width: 850px) {
		.welcome {
			flex-direction: column;
			overflow-y: scroll;

			.first {
				width: 100%;
				box-sizing: border-box;
				max-width: none;

				background: transparent;

				.bio {
					overflow-y: hidden;
				}

				.admin {
					margin-top: 20px;
				}

				> * {
					max-width: 400px;
				}
			}

			.second {
				width: 100%;
				height: 100%;

				box-sizing: border-box;
				max-width: none;
				min-width: auto;

				background: var(--bg2);
				border-radius: var(--br-lg) var(--br-lg) 0 0;
				padding: 8px;
				overflow-y: scroll;
			}
		}
	}
</style>
