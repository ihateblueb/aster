<script>
	import Button from '$lib/components/Button.svelte';
	import { IconUserMinus, IconUserPlus } from '@tabler/icons-svelte';

	export let user;
	let following = false;
</script>

{#if user}
	{#if following}
		<Button danger blur nm>
			<span class="content">
				<IconUserMinus size="var(--fs-lg)" />
				<span class="label">Unfollow</span>
			</span>
		</Button>
	{:else if user.locked}
		<Button accent blur nm>
			<span class="content">
				<IconUserPlus size="var(--fs-lg)" />
				<span class="label">Follow request</span>
			</span>
		</Button>
	{:else}
		<Button accent blur nm>
			<span class="content">
				<IconUserPlus size="var(--fs-lg)" />
				<span class="label">Follow</span>
			</span>
		</Button>
	{/if}
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
