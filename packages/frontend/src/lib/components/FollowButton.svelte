<script>
	import Button from '$lib/components/Button.svelte';
	import { IconUserMinus, IconUserPlus } from '@tabler/icons-svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import getUserRelationship from '$lib/api/user/relationship';
	import Loading from '$lib/components/Loading.svelte';
	import followUser from '$lib/api/user/follow';

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
				<span class="label">Unfollow</span>
			{:else if $query.data?.to?.type === 'follow' && $query.data?.to?.pending}
				<IconUserMinus size="18px" />
				<span class="label">Cancel request</span>
			{:else if user.locked}
				<IconUserPlus size="18px" />
				<span class="label">Follow request</span>
			{:else}
				<IconUserPlus size="18px" />
				<span class="label">Follow</span>
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
