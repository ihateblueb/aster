<script>
	import Button from '$lib/components/Button.svelte';
	import {
		IconTrash,
		IconUserMinus,
		IconUserPlus
	} from '@tabler/icons-svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import getUserRelationship from '$lib/api/user/relationship';
	import Loading from '$lib/components/Loading.svelte';
	import followUser from '$lib/api/user/follow';
	import LocalizedString from '$lib/components/LocalizedString.svelte';

	let { user, query } = $props();

	function follow() {
		followUser(user.id).then(() => {
			$query.refetch();
		});
	}
</script>

{#if user}
	<Button
		danger={$query.data?.to?.type === 'follow' || $query.data?.to?.pending}
		blur
		nm
		on:click={() => follow()}
	>
		<span class="content">
			{#if $query.isLoading}
				<Loading size="18px" />
			{:else if $query.data?.to?.type === 'follow' && !$query.data?.to?.pending}
				<IconUserMinus size="18px" />
				<span class="label">
					<LocalizedString id="unfollow" />
				</span>
			{:else if $query.data?.to?.type === 'follow' && $query.data?.to?.pending}
				<IconUserMinus size="18px" />
				<span class="label">
					<LocalizedString id="cancel-follow" /></span
				>
			{:else if user.locked}
				<IconUserPlus size="18px" />
				<span class="label">
					<LocalizedString id="follow-request" /></span
				>
			{:else}
				<IconUserPlus size="18px" />
				<span class="label"> <LocalizedString id="follow" /></span>
			{/if}
		</span>
	</Button>
{/if}

<style lang="scss" scoped>
	@media (max-width: 750px) {
		.label {
			display: none;
		}
	}

	.content {
		display: flex;
		align-items: center;
		gap: 6px;

		color: var(--tx1);
	}
</style>
