<script lang="ts">
	import {
		IconBug,
		IconDental,
		IconRepeat,
		IconStar,
		IconUserPlus
	} from '@tabler/icons-svelte';
	import NoteSimple from '$lib/components/NoteSimple.svelte';
	import Mfm from '$lib/components/Mfm.svelte';
	import Time from '$lib/components/Time.svelte';

	import {
		blur,
		crossfade,
		draw,
		fade,
		fly,
		scale,
		slide
	} from 'svelte/transition';

	let { notification, floating = false, small = false } = $props();
</script>

{#snippet icon()}
	{#if notification.type === 'debug'}
		<IconBug size="var(--fs-lg)" color="var(--ac1)" />
	{:else if notification.type === 'like'}
		<IconStar size="var(--fs-lg)" color="var(--like)" />
	{:else if notification.type === 'repeat'}
		<IconRepeat size="var(--fs-lg)" color="var(--repeat" />
	{:else if notification.type === 'acceptedFollow'}
		<IconUserPlus size="var(--fs-lg)" color="var(--ac1)" />
	{:else if notification.type === 'follow'}
		<IconUserPlus size="var(--fs-lg)" color="var(--ac1)" />
	{:else if notification.type === 'bite'}
		<IconDental size="var(--fs-lg)" color="var(--ac1)" />
	{/if}
{/snippet}

{#snippet name(user)}
	<a
		class="name"
		href={'/@' + user.username + (user.local ? '' : '@' + user.host)}
	>
		<Mfm simple content={user.displayName ?? user.username} />
	</a>
{/snippet}

{#snippet title()}
	{#if notification.type === 'debug'}
		Debug
	{:else if notification.type === 'like'}
		{@render name(notification?.from)} liked your note
	{:else if notification.type === 'repeat'}
		{@render name(notification?.from)} repeated your note
	{:else if notification.type === 'acceptedFollow'}
		{@render name(notification?.from)} accepted your follow request
	{:else if notification.type === 'follow'}
		{@render name(notification?.from)} followed you
	{:else if notification.type === 'bite' && !notification.note}
		{@render name(notification?.from)} bit you
	{:else if notification.type === 'bite' && notification.note}
		{@render name(notification?.from)} bit your note
	{/if}
{/snippet}

<div
	class={'notification' +
		(small ? ' small' : '') +
		(floating ? ' floating' : '')}
	transition:fly={{ x: floating ? 250 : 0 }}
>
	<div class="top">
		<div class="left">
			<div class="icon">
				{@render icon()}
			</div>
			<div class="title">
				{@render title()}
			</div>
		</div>
		{#if !floating}
			<div class="right">
				<Time time={notification.createdAt} />
			</div>
		{/if}
	</div>
	{#if notification.note}
		<div class="body">
			{#if floating}
				{notification.note.content}
			{:else}
				<NoteSimple note={notification.note} nomargin />
			{/if}
		</div>
	{/if}
</div>

<style lang="scss" scoped>
	.notification {
		display: flex;
		flex-direction: column;

		padding: 16px;
		transition: 0.1s;

		border-radius: var(--br-md);

		&:hover {
			background-color: var(--bg3-25);
		}

		.top {
			display: flex;
			gap: 4px;

			.left {
				display: flex;
				align-items: start;
				gap: 10px;

				flex-grow: 1;
			}

			.right {
				display: flex;
				align-items: center;
			}
		}

		.title {
			.name {
				font-weight: bold;
				color: var(--tx2);
				text-decoration: none;
			}
		}

		.body {
			margin-top: 10px;
		}

		&.floating {
			background-color: var(--bg4-25);
			backdrop-filter: blur(var(--blur-md));

			max-width: 250px;
			min-width: 200px;

			.body {
				margin-top: 2px;

				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
			}
		}

		&.small {
			padding: 12px;
		}
	}
</style>
