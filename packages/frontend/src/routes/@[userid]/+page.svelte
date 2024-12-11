<script lang="ts">
	import PageWrapper from '$lib/components/PageWrapper.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';

	import { createQuery, QueryCache } from '@tanstack/svelte-query';
	import Error from '$lib/components/Error.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import Avatar from '$lib/components/Avatar.svelte';
	import {
		IconCake,
		IconMapPin,
		IconPin,
		IconUserCircle
	} from '@tabler/icons-svelte';
	import lookupUser from '$lib/api/user/lookup.js';
	import Button from '$lib/components/Button.svelte';
	import localstore from '$lib/localstore.js';
	import Mfm from '$lib/components/Mfm.svelte';
	import queryClient from '$lib/queryclient.js';
	import { writable } from 'svelte/store';

	let { data } = $props();

	console.log(data);

	if (data.userid) queryClient.clear();

	const query = createQuery({
		queryKey: ['user'],
		retry: false,
		queryFn: async () => await lookupUser('@' + data.userid)
	});
</script>

<PageHeader
	title={$query.data
		? $query.data.displayName
			? $query.data.displayName
			: $query.data.username
				? $query.data.username
				: 'User'
		: 'User'}
>
	<svelte:fragment slot="icon">
		{#if $query.isSuccess}
			{#if $query.data && $query.data.avatar}
				<Avatar small size="var(--fs-lg)" user={$query.data} />
			{:else}
				<IconUserCircle size="var(--fs-lg)" />
			{/if}
		{:else}
			<IconUserCircle size="var(--fs-lg)" />
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
		<div class="header">
			<img
				class="banner"
				src={$query.data.banner ??
					'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiPjwvc3ZnPg=='}
				alt={$query.data.bannerAlt}
			/>
			<div class="float">
				<div class="left">
					<Avatar size="65px" user={$query.data} />
					<div class="names">
						<p class="top">
							{$query.data.displayName
								? $query.data.displayName
								: $query.data.username}
						</p>
						<p class="bottom">
							@{$query.data
								.username}{#if !$query.data.local}@{$query.data
									.host}{/if}
						</p>
					</div>
				</div>
				<div class="right">
					<Button nm>Follow</Button>
				</div>
			</div>
		</div>
		<div class="lower">
			<p class="description">
				{#if $query.data.bio}
					<Mfm content={$query.data.bio} />
				{:else}
					<span class="missing"
						>This user hasn't written a bio yet.</span
					>
				{/if}
			</p>
			{#if $query.data.birthday || $query.data.location}
				<div class="pairs">
					{#if $query.data.birthday}
						<p class="pair">
							<span class="key">
								<IconCake size="var(--fs-lg)" />
							</span>
							<span class="val">
								{new Date($query.data.birthday).toLocaleString(
									undefined,
									{
										month: 'long',
										day: 'numeric',
										year: 'numeric'
									}
								)}
							</span>
						</p>
					{/if}
					{#if $query.data.location}
						<p class="pair">
							<span class="key"
								><IconMapPin size="var(--fs-lg)" /></span
							>
							<span class="val">{$query.data.location}</span>
						</p>
					{/if}
				</div>
			{/if}
			<p class="joinedOn">
				Joined {new Date($query.data.createdAt).toLocaleTimeString(
					undefined,
					{
						weekday: 'long',
						month: 'long',
						day: 'numeric',
						year: 'numeric',
						hour: 'numeric',
						minute: '2-digit',
						second: '2-digit'
					}
				)}
			</p>
			<div class="counts">
				<span class="count">
					<b>0</b> notes
				</span>
				<span class="count">
					<b>0</b> following
				</span>
				<span class="count">
					<b>0</b> followers
				</span>
			</div>
		</div>
	{/if}
</PageWrapper>

<style lang="scss" scoped>
	.header {
		position: relative;
		margin: -8px -8px 0 -8px;
		overflow: hidden;

		&::after {
			position: absolute;
			content: '';

			width: calc(100% + 80px);
			height: 100%;
			left: -40px;
			top: 0;

			box-shadow: inset 0px -40px 30px var(--bg2);
		}

		.banner {
			height: 300px;
			width: 100%;

			box-sizing: border-box;
			object-fit: cover;
			user-select: none;

			background-color: var(--bg3-25);
		}

		.float {
			display: flex;
			position: absolute;
			align-items: center;
			gap: 10px;

			bottom: 0;
			z-index: 10;

			margin-bottom: 30px;
			padding: 12px;

			width: 100%;
			box-sizing: border-box;

			.left,
			.right {
				display: flex;
				align-items: center;
				gap: 10px;
			}

			.left {
				flex-grow: 1;

				p {
					color: var(--tx1);
					text-shadow:
						0 1px 5px var(--bg1),
						0 -1px 5px var(--bg1),
						1px 1px 5px var(--bg1),
						-1px -1px 5px var(--bg1);

					&.top {
						font-size: var(--fs-xl);
						font-weight: bold;
					}
				}
			}
		}
	}
	.lower {
		padding: 18px 20px;
		margin: -8px -8px 0 -8px;
		border-bottom: 1px solid var(--bg3);

		.description {
			.missing {
				color: var(--tx3);
				font-style: italic;
			}
		}

		.pairs {
			display: flex;
			flex-direction: column;

			margin-top: 10px;
			gap: 5px;

			.pair {
				display: flex;
				align-items: center;
				gap: 5px;

				.key,
				.val {
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.key {
					font-weight: 600;
				}
			}
		}

		.joinedOn {
			margin-top: 10px;
		}

		.counts {
			margin-top: 10px;
			display: flex;
			align-items: center;
			gap: 10px;
		}
	}
</style>
