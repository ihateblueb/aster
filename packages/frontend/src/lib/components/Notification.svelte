<script lang="ts">
	import {
		IconAt,
		IconBug,
		IconDental,
		IconMoodPlus,
		IconMoodSmile,
		IconRepeat,
		IconStar,
		IconUserPlus,
		IconUserQuestion
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
	import Button from '$lib/components/Button.svelte';
	import acceptFollowRequest from '$lib/api/follow-requests/accept.js';
	import rejectFollowRequest from '$lib/api/follow-requests/reject.js';
	import LocalizedString from '$lib/components/LocalizedString.svelte';

	let { notification, floating = false, small = false } = $props();
</script>

{#snippet icon()}
	{#if notification.type === 'debug'}
		<IconBug size="18px" color="var(--ac1)" />
	{:else if notification.type === 'like'}
		<IconStar size="18px" color="var(--like)" />
	{:else if notification.type === 'react'}
		<IconMoodPlus size="18px" color="var(--ac1)" />
	{:else if notification.type === 'repeat'}
		<IconRepeat size="18px" color="var(--repeat" />
	{:else if notification.type === 'acceptedFollow'}
		<IconUserPlus size="18px" color="var(--ac1)" />
	{:else if notification.type === 'follow'}
		{#if notification?.relationship?.pending}
			<IconUserQuestion size="18px" color="var(--ac1)" />
		{:else}
			<IconUserPlus size="18px" color="var(--ac1)" />
		{/if}
	{:else if notification.type === 'bite'}
		<IconDental size="18px" color="var(--ac1)" />
	{:else if notification.type === 'mention'}
		<IconAt size="18px" color="var(--ac1)" />
	{/if}
{/snippet}

{#snippet name(user)}
	<a
		class="name"
		href={'/@' + user.username + (user.local ? '' : '@' + user.host)}
	>
		<Mfm
			simple
			content={user.displayName ?? user.username}
			emojis={user.emojis}
		/>
	</a>
{/snippet}

<!-- todo: localization -->
{#snippet title()}
	{#if notification.type === 'debug'}
		<LocalizedString id="debug" />
	{:else if notification.type === 'like'}
		{@render name(notification?.from)} liked your note
	{:else if notification.type === 'react'}
		{@render name(notification?.from)} reacted to your note
	{:else if notification.type === 'repeat'}
		{@render name(notification?.from)} repeated your note
	{:else if notification.type === 'acceptedFollow'}
		{@render name(notification?.from)} accepted your follow request
	{:else if notification.type === 'follow'}
		{#if notification?.relationship?.pending}
			{@render name(notification?.from)} requested to follow you
		{:else}
			{@render name(notification?.from)} followed you
		{/if}
	{:else if notification.type === 'bite' && !notification.note}
		{@render name(notification?.from)} bit you
	{:else if notification.type === 'bite' && notification.note}
		{@render name(notification?.from)} bit your note
	{:else if notification.type === 'mention'}
		{@render name(notification?.from)} mentioned you
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
	{#if notification?.relationship?.pending}
		<div class="body">
			<Button
				accent
				nm
				on:click={() =>
					acceptFollowRequest(notification.relationship.id)}
			>
				<LocalizedString id="accept" />
			</Button>
			<Button
				nm
				on:click={() =>
					rejectFollowRequest(notification.relationship.id)}
			>
				<LocalizedString id="reject" />
			</Button>
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
			gap: 10px;

			.left {
				display: flex;
				align-items: start;
				gap: 10px;

				flex-grow: 1;
			}

			.right {
				display: flex;
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
			display: flex;
			gap: 10px;

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
