<script lang="ts">
	import PageWrapper from '$lib/components/PageWrapper.svelte';

	import { createQuery } from '@tanstack/svelte-query';
	import getAdminFederationRules from '$lib/api/admin/federation/rules/get';
	import Loading from '$lib/components/Loading.svelte';
	import Error from '$lib/components/Error.svelte';
	import InstanceRuleCard from '$lib/components/InstanceRuleCard.svelte';
	import Button from '$lib/components/Button.svelte';
	import { IconPlus } from '@tabler/icons-svelte';

	const query = createQuery({
		queryKey: ['federationRules'],
		retry: false,
		queryFn: async () => await getAdminFederationRules()
	});

	let newData = $state([]);

	const emptyRecord = {
		host: '',
		cw: '',
		sensitive: false,
		deliver: true,
		accept: true,
		fetch: true,
		return: true
	};
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
		<div class="top">
			<div class="left">
				{$query.data.length} rules
			</div>
			<div class="right">
				<Button nm on:click={() => newData.push(emptyRecord)}>
					<IconPlus size="var(--fs-lg)" />
					Add Rule
				</Button>
			</div>
		</div>
		<div class="btm">
			{#each newData as newInstanceRule}
				<InstanceRuleCard instanceRule={newInstanceRule} />
			{/each}
			{#each $query.data as instanceRule}
				<InstanceRuleCard {instanceRule} />
			{/each}
		</div>
	{/if}
</PageWrapper>

<style lang="scss" scoped>
	.top {
		display: flex;
		align-items: center;

		padding: 0px 8px 12px 8px;

		.left {
			flex-grow: 1;
		}
	}
	.btm {
		display: block;
	}
</style>
