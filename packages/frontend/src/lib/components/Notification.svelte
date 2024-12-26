<script lang="ts">
	import { IconRepeat, IconStar, IconUserPlus } from '@tabler/icons-svelte';
	import NoteSimple from '$lib/components/NoteSimple.svelte';

	export let notification;
</script>

{#snippet icon()}
	{#if notification.type === 'like'}
		<IconStar size="var(--fs-lg)" />
	{:else if notification.type === 'repeat'}
		<IconRepeat size="var(--fs-lg)" />
	{:else if notification.type === 'acceptedFollow'}
		<IconUserPlus size="var(--fs-lg)" />
	{/if}
{/snippet}

{#snippet title()}
	{#if notification.type === 'like'}
		<b>{notification.user.displayName ?? notification.user.username}</b> liked
		your note
	{:else if notification.type === 'repeat'}
		<b>{notification.user.displayName ?? notification.user.username}</b> repeated
		your note
	{:else if notification.type === 'acceptedFollow'}
		<b>{notification.user.displayName ?? notification.user.username}</b> followed
		you
	{/if}
{/snippet}

<div class="notification">
	<div class="top">
		<div class="icon">
			{@render icon()}
		</div>
		<div class="title">
			{@render title()}
		</div>
	</div>
	<div class="body">
		{#if notification.note}
			<NoteSimple note={notification.note} />
		{/if}
	</div>
</div>

<style lang="scss" scoped>
	.notification {
		display: flex;
		flex-direction: column;
		gap: 10px;

		padding: 16px;
		transition: 0.1s;

		&:hover {
			border-radius: var(--br-md);
			background-color: var(--bg3-25);
		}

		.top {
			display: flex;
			align-items: start;
			gap: 10px;
		}
	}
</style>
