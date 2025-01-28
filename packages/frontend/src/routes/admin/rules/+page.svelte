<script lang="ts">
	import PageWrapper from '$lib/components/PageWrapper.svelte';

	import { createQuery } from '@tanstack/svelte-query';
	import getAdminFederationRules from '$lib/api/admin/federation/rules/get';
	import Loading from '$lib/components/Loading.svelte';
	import Error from '$lib/components/Error.svelte';
	import InstanceRuleCard from '$lib/components/InstanceRuleCard.svelte';
	import Button from '$lib/components/Button.svelte';
	import { IconPlus } from '@tabler/icons-svelte';
	import Input from '$lib/components/Input.svelte';
	import Toggle from '$lib/components/Toggle.svelte';
	import Modal from '$lib/components/Modal.svelte';

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

	let modal: Modal;
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
				<Button nm on:click={() => modal.open()}>
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

<Modal bind:this={modal}>
	<svelte:fragment slot="text">
		<h2>Add federation rule</h2>
	</svelte:fragment>

	<Input label="Host" placeholder="example.com" wide></Input>
	<p>
		Hosts will be truncated to only include the base domain (e.g.
		some.example.com becomes example.com)
	</p>
	<br />
	<Input label="Content warning" placeholder="untagged sensitive media" wide
	></Input>
	<p>
		This content warning will be put on every incoming note that doesn't
		already have one.
	</p>
	<br />
	<Toggle label="Mark all media and users as sensitive" />
	<Toggle label="Deliver activities" />
	<Toggle label="Accept activies" />
	<Toggle label="Fetch objects" />
	<Toggle label="Return objects" />

	<svelte:fragment slot="buttons">
		<Button accent>Add</Button>
		<Button on:click={() => modal.close()}>Cancel</Button>
	</svelte:fragment>
</Modal>

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
