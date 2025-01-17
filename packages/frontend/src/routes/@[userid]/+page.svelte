<script lang="ts">
	import PageWrapper from '$lib/components/PageWrapper.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';

	import { createQuery, QueryCache } from '@tanstack/svelte-query';
	import Error from '$lib/components/Error.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import Avatar from '$lib/components/Avatar.svelte';
	import {
		IconArrowLeft,
		IconArrowLeftRight,
		IconArrowRight,
		IconArrowsLeftRight,
		IconBan,
		IconCake,
		IconDotsVertical,
		IconLock,
		IconMapPin,
		IconPin,
		IconPlus,
		IconUserCircle,
		IconUserPlus,
		IconVolumeOff
	} from '@tabler/icons-svelte';
	import lookupUser from '$lib/api/user/lookup.js';
	import Button from '$lib/components/Button.svelte';
	import Mfm from '$lib/components/Mfm.svelte';
	import queryClient from '$lib/queryclient.js';
	import Toggle from '$lib/components/Toggle.svelte';
	import FollowButton from '$lib/components/FollowButton.svelte';
	import getUserRelationship from '$lib/api/user/relationship.js';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import UserDropdown from '$lib/components/dropdowns/UserDropdown.svelte';

	let props = $props();

	console.log(props.data);

	if (props.data.userid) queryClient.clear();

	const query = createQuery({
		queryKey: ['user'],
		retry: false,
		queryFn: async () => await lookupUser('@' + props.data.userid)
	});

	// this should only be used once the query finishes, so it's safe to use tha data in it!
	const relationshipQuery = createQuery({
		queryKey: ['relationship'],
		retry: false,
		queryFn: async () =>
			await getUserRelationship($query.data.id ?? undefined)
	});

	let show = $state(true);
	query.subscribe((e) => {
		if (e.data?.sensitive) show = false;
	});

	let dropdown: Dropdown;
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

	<Button header on:click={(e) => dropdown.open(e)}>
		<IconDotsVertical size="var(--fs-lg)" />
	</Button>
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
		{#if show}
			<div class="header">
				<img
					class="banner"
					src={$query.data.banner ??
						'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiPjwvc3ZnPg=='}
					alt={$query.data.bannerAlt}
				/>
				<div class="float">
					<div class="left">
						<Avatar large size="65px" user={$query.data} />
						<div class="names">
							<p class="top">
								{$query.data.displayName
									? $query.data.displayName
									: $query.data.username}

								{#if $relationshipQuery.isSuccess && $relationshipQuery.data}
									{#if $relationshipQuery.data.to?.type === 'follow' && !$relationshipQuery.data.to?.pending && $relationshipQuery.data.from?.type === 'follow' && !$relationshipQuery.data.from?.pending}
										<span class="relationship">
											<IconArrowsLeftRight
												size="var(--fs-md)"
											/>
											Mutuals
										</span>
									{:else if $relationshipQuery.data.to?.type === 'follow' && !$relationshipQuery.data.to?.pending && $relationshipQuery.data.from?.type !== 'follow' && !$relationshipQuery.data.from?.pending}
										<span class="relationship">
											<IconArrowLeft
												size="var(--fs-md)"
											/>
											Following
										</span>
									{:else if $relationshipQuery.data.to?.type !== 'follow' && !$relationshipQuery.data.to?.pending && $relationshipQuery.data.from?.type === 'follow' && !$relationshipQuery.data.from?.pending}
										<span class="relationship">
											<IconArrowRight
												size="var(--fs-md)"
											/>
											Follows you
										</span>
									{/if}
								{/if}
							</p>
							<p class="bottom">
								@{$query.data
									.username}{#if !$query.data.local}@{$query
										.data.host}{/if}
							</p>
						</div>
					</div>
					<div class="right">
						<FollowButton
							user={$query.data}
							query={relationshipQuery}
						/>
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
									{new Date(
										$query.data.birthday
									).toLocaleString(undefined, {
										month: 'long',
										day: 'numeric',
										year: 'numeric'
									})}
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
		{:else}
			<div class="sensitive">
				<div class="top">
					<p>This user's profile may be sensitive.</p>
				</div>
				<div class="mid">
					{#if $query.data.bio}
						<Mfm content={$query.data.bio} />
					{:else}
						<span class="missing">
							This user hasn't written a bio yet.
						</span>
					{/if}
				</div>
				<div class="btm">
					<Toggle label="Don't ask again for this user" />
					<div class="btns">
						<Button danger>
							<IconBan size="var(--fs-lg)" />
							Block
						</Button>
						<Button danger>
							<IconVolumeOff size="var(--fs-lg)" />
							Mute
						</Button>
						<Button
							on:click={() => {
								show = true;
							}}>Continue</Button
						>
					</div>
				</div>
			</div>
		{/if}
	{/if}
</PageWrapper>

<Dropdown bind:this={dropdown}>
	<UserDropdown user={$query.data} />
</Dropdown>

<style lang="scss" scoped>
	.sensitive {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		height: 100%;
		box-sizing: border-box;

		gap: 10px;
		padding: 22px;

		.top {
			p {
				font-size: var(--fs-lg);
				font-weight: 600;
				margin-bottom: 10px;
			}
		}

		.mid {
			.missing {
				color: var(--tx3);
				font-style: italic;
			}
		}

		.btm {
			display: flex;
			align-items: center;
			flex-direction: column;

			margin-top: 10px;
			gap: 5px;

			.btns {
				display: flex;
				align-items: center;
				gap: 10px;
			}
		}
	}
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

			box-shadow: inset 0px -50px 40px var(--bg2);
		}

		.banner {
			height: 300px;
			width: 100%;

			box-sizing: border-box;
			object-fit: cover;
			user-select: none;

			background-color: var(--bg3-50);
		}

		.relationship {
			display: inline-flex;
			align-items: center;

			padding: 4px 8px;
			gap: 4px;

			font-size: var(--fs-sm);
			font-weight: normal;
			border-radius: var(--br-md);
			background: var(--bg1-75);
		}

		.float {
			display: flex;
			position: absolute;
			align-items: center;
			gap: 10px;

			bottom: 0;
			z-index: 10;

			margin-bottom: 10px;
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
						margin-bottom: 4px;
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
