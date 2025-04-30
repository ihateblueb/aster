<script>
	import PageWrapper from '$lib/components/PageWrapper.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import getAdminMeta from '$lib/api/admin/meta.js';
	import Loading from '$lib/components/Loading.svelte';
	import Error from '$lib/components/Error.svelte';
	import {
		IconFlag,
		IconMoodSmile,
		IconNote,
		IconUser
	} from '@tabler/icons-svelte';
	import LocalizedString from '$lib/components/LocalizedString.svelte';

	const query = createQuery({
		queryKey: ['admin-meta'],
		retry: false,
		queryFn: async () => getAdminMeta()
	});
</script>

<PageWrapper>
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
		<div class="stats">
			{#each Object.keys($query.data?.stats) as stat}
				{#snippet icon(stat)}
					<div class="icon">
						{#if stat === 'user'}
							<IconUser size="18px" color="var(--ac1)" />
						{:else if stat === 'note'}
							<IconNote size="18px" color="var(--ac1)" />
						{:else if stat === 'emoji'}
							<IconMoodSmile size="18px" color="var(--ac1)" />
						{:else if stat === 'report'}
							<IconFlag size="18px" color="var(--ac1)" />
						{/if}
					</div>
				{/snippet}

				{#snippet label(stat)}
					<span class="label">
						{#if stat === 'user'}
							<LocalizedString id="users" />
						{:else if stat === 'note'}
							<LocalizedString id="notes" />
						{:else if stat === 'emoji'}
							<LocalizedString id="emojis" />
						{:else if stat === 'report'}
							<LocalizedString id="reports" />
						{/if}
					</span>
				{/snippet}

				{#if stat !== 'remote'}
					<div class="stat">
						{@render icon(stat)}
						<div class="text">
							{@render label(stat)}
							<b>
								{$query.data?.stats[stat]}
							</b>
						</div>
					</div>
				{/if}
			{/each}
		</div>
	{/if}
</PageWrapper>

<style lang="scss">
	.stats {
		display: flex;
		flex-wrap: wrap;
		gap: 15px;

		justify-content: space-between;

		.stat {
			display: flex;
			align-items: center;
			gap: 15px;

			width: 48%;
			box-sizing: border-box;
			background-color: var(--bg-3-25);

			.icon {
				display: flex;
				align-items: center;
				padding: 12px;
				border-radius: var(--br-md);
				background-color: var(--ac1-50);
			}

			.text {
				display: flex;
				flex-direction: column;
				gap: 2px;

				.label {
					color: var(--tx3);
					font-size: var(--fs-sm);
				}
				b {
					font-size: var(--fs-lg);
				}
			}
		}
	}
</style>
