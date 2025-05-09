<script lang="ts">
	import {
		IconAlertCircle,
		IconArrowBackUp,
		IconArrowBackUpDouble,
		IconBellOff,
		IconBookmark,
		IconCopy,
		IconDots,
		IconExternalLink,
		IconInfoCircle,
		IconLink,
		IconMinus,
		IconPencil,
		IconPlus,
		IconQuote,
		IconRepeat,
		IconRepeatOff,
		IconStar,
		IconStarFilled,
		IconTrash
	} from '@tabler/icons-svelte';
	import store from '$lib/store';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import DropdownItem from '$lib/components/DropdownItem.svelte';
	import DropdownDivider from '$lib/components/DropdownDivider.svelte';
	import repeatNote from '$lib/api/note/repeat';
	import localstore from '$lib/localstore';
	import deleteNote from '$lib/api/note/delete';
	import { page } from '$app/state';
	import likeNote from '$lib/api/note/like';
	import playSound from '$lib/sounds';
	import EmojiDropdown from '$lib/components/dropdowns/EmojiDropdown.svelte';
	import reactNote from '$lib/api/note/react';
	import LocalizedString from '$lib/components/LocalizedString.svelte';

	let self = $state();
	function updateSelf() {
		self = localstore.getParsed('self');
	}
	updateSelf();

	let { note } = $props();

	let didIRepeat = $state(false);
	let didILike = $state(false);
	let didIReact = $state(false);

	if (self) {
		didIRepeat = note?.repeats?.some((e) => e?.user?.id === self?.id);
		didILike = note?.likes?.some((e) => e?.user?.id === self?.id);

		if (note.reactions && note.reactions.length > 0) {
			for (let reaction of note.reactions) {
				if (
					reaction?.users &&
					reaction?.users.length > 0 &&
					reaction?.users?.some((e) => e?.id === self?.id)
				)
					didIReact = true;
			}
		}
	}

	let hideCounters = $state(localstore.get('hideInteractionCounters'));

	function reply() {
		store.draft_replyingTo.set(note?.id);
		store.showCompose.set(true);
	}
	function repeat() {
		if (!didIRepeat) playSound('newNote');
		if (didIRepeat) playSound('uninteract');
		repeatNote(note?.id).then(() => {
			didIRepeat = !didIRepeat;
		});
	}
	function quote() {
		store.draft_repeat.set(note?.id);
	}
	function like() {
		if (!didILike) playSound('interact');
		if (didILike) playSound('uninteract');
		likeNote(note?.id).then(() => {
			didILike = !didILike;
		});
	}
	function react(emoji: string) {
		if (!didIReact) playSound('interact');
		if (didIReact) playSound('uninteract');
		reactNote(note?.id, emoji).then(() => {
			didIReact = !didIReact;
		});
	}
	function removeReaction() {
		react('');
	}

	let repeatDropdown: Dropdown;
	let reactDropdown: Dropdown;
	let moreDropdown: Dropdown;

	function moreDelete() {
		deleteNote(note?.id);
	}

	let repeatable = !(
		(note.visibility === 'followers' || note.visibility === 'direct') &&
		self?.id !== note.user.id
	);
</script>

{#if note.reactions && note.reactions.length > 0}
	<div class="reactions">
		{#each note.reactions as reaction}
			{@const didIReactHere =
				reaction?.users && reaction?.users.length > 0
					? reaction?.users?.some((e) => e?.id === self?.id)
					: false}

			<div
				class={'reaction' + (didIReactHere ? ' reacted' : '')}
				title={reaction.emoji
					? reaction.emoji.host
						? ':' +
							reaction.emoji.shortcode +
							'@' +
							reaction.emoji.host +
							':'
						: ':' + reaction.emoji.shortcode + ':'
					: reaction.content}
			>
				<span class="content">
					{#if reaction.content}
						{reaction.content}
					{:else}
						<img src={reaction?.emoji?.file?.src} />
					{/if}
				</span>
				{#if !hideCounters}
					<span class="counter">{reaction.users.length}</span>
				{/if}
			</div>
		{/each}
	</div>
{/if}

<footer>
	<div class={'item' + (self ? '' : ' loggedOut')}>
		<button on:click={() => reply()}>
			<span class="icon">
				{#if note.replyingTo}
					<IconArrowBackUpDouble size="20px" />
				{:else}
					<IconArrowBackUp size="20px" />
				{/if}
			</span>
			{#if note.replies && note.replies.length > 0}
				{#if !hideCounters}
					<span class="counter">{note.replies.length}</span>
				{/if}
			{/if}
		</button>
	</div>
	<div
		class={'item' +
			(self ? '' : ' loggedOut') +
			(didIRepeat ? ' repeated' : '') +
			(repeatable ? '' : ' unrepeatable')}
	>
		<button
			on:click={(e) => (repeatable ? repeatDropdown.open(e) : undefined)}
		>
			<span class="icon">
				{#if repeatable}
					<IconRepeat size="20px" />
				{:else}
					<IconRepeatOff size="20px" />
				{/if}
			</span>
			{#if note.repeats && note.repeats.length > 0}
				{#if !hideCounters}
					<span class="counter">{note.repeats.length}</span>
				{/if}
			{/if}
		</button>
	</div>
	<div
		class={'item' + (self ? '' : ' loggedOut') + (didILike ? ' liked' : '')}
	>
		<button on:click={() => like()}>
			<span class="icon">
				{#if didILike}
					<IconStarFilled size="20px" />
				{:else}
					<IconStar size="20px" />
				{/if}
			</span>
			{#if note.likes && note.likes.length > 0}
				{#if !hideCounters}
					<span class="counter">{note.likes.length}</span>
				{/if}
			{/if}
		</button>
	</div>
	<div class={'item' + (self ? '' : ' loggedOut')}>
		{#if didIReact}
			<button on:click={() => removeReaction()}>
				<span class="icon">
					<IconMinus size="20px" />
				</span>
			</button>
		{:else}
			<button on:click={(e) => reactDropdown.open(e)}>
				<span class="icon">
					<IconPlus size="20px" />
				</span>
			</button>
		{/if}
	</div>
	<div class="item">
		<button on:click={(e) => moreDropdown.open(e)}>
			<span class="icon">
				<IconDots size="20px" />
			</span>
		</button>
	</div>
</footer>

<!-- Repeat Dropdown -->
<Dropdown bind:this={repeatDropdown}>
	<DropdownItem on:click={() => repeat()}>
		<IconRepeat size="18px" />
		<LocalizedString id="repeat" />
	</DropdownItem>
	<DropdownItem on:click={() => quote()}>
		<IconQuote size="18px" />
		<LocalizedString id="quote" />
	</DropdownItem>
</Dropdown>

<!-- React Dropdown -->
<Dropdown bind:this={reactDropdown} emoji>
	<EmojiDropdown on:emojiSelected={(e) => react(e.detail)} />
</Dropdown>

<!-- More Dropdown -->
<Dropdown bind:this={moreDropdown}>
	<DropdownItem to={'/notes/' + note.id}>
		<IconInfoCircle size="18px" />
		<LocalizedString id="details" />
	</DropdownItem>
	<DropdownDivider />
	<DropdownItem on:click={() => navigator.clipboard.writeText(note.content)}>
		<IconCopy size="18px" />
		<LocalizedString id="copy-content" />
	</DropdownItem>
	<!-- TODO: wrong -->
	<DropdownItem
		on:click={() =>
			navigator.clipboard.writeText(
				note.user.local ? note.apId : page.url.href + 'notes/' + note.id
			)}
	>
		<IconLink size="18px" />
		<LocalizedString id="copy-link" />
	</DropdownItem>
	{#if !note.user.local}
		<DropdownItem on:click={() => navigator.clipboard.writeText(note.apId)}>
			<IconLink size="18px" />
			<LocalizedString id="copy-link-origin" />
		</DropdownItem>
		<DropdownItem to={note.apId} newTab>
			<IconExternalLink size="18px" />
			<LocalizedString id="view-on-remote" />
		</DropdownItem>
	{/if}
	<DropdownDivider />
	<DropdownItem>
		<IconBellOff size="18px" />
		<LocalizedString id="mute-thread" />
	</DropdownItem>
	<DropdownItem>
		<IconBookmark size="18px" />
		<LocalizedString id="bookmark" />
	</DropdownItem>
	<DropdownItem>
		<IconAlertCircle size="18px" />
		<LocalizedString id="report" />
	</DropdownItem>
	{#if note.user.id === self.id}
		<DropdownDivider />
		<DropdownItem>
			<IconPencil size="18px" />
			<LocalizedString id="edit" />
		</DropdownItem>
		<DropdownItem danger on:click={() => moreDelete()}>
			<IconTrash size="18px" />
			<LocalizedString id="delete" />
		</DropdownItem>
	{:else if self.admin}
		<DropdownDivider />
		<DropdownItem danger on:click={() => moreDelete()}>
			<IconTrash size="18px" />
			<LocalizedString id="delete" />
		</DropdownItem>
	{/if}
</Dropdown>

<style lang="scss" scoped>
	.reactions {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 10px;
		overflow-x: auto;

		.reaction {
			display: flex;
			align-items: center;
			gap: 6px;

			background: var(--bg4-25);
			padding: 6px 8px;
			border-radius: var(--br-md);
			box-shadow: var(--funky-effect);
			transition: 0.1s;

			&:hover {
				background: var(--bg4-50);
			}

			.content {
				display: flex;
				align-items: center;

				img {
					height: 1.4rem !important;
				}
			}
			.counter {
				font-size: var(--fs-sm);
				user-select: none;
			}

			&.reacted {
				color: var(--ac1);
				background: var(--ac1-25);
			}
		}
	}

	footer {
		display: flex;
		flex-direction: row;
		align-items: center;

		.item {
			align-items: flex-start;
			flex: 1;
			max-width: 85px;

			button {
				display: flex;
				align-items: center;

				background: none;
				border: none;

				color: var(--tx3);
				font-family: var(--font);
				padding: 4px 6px;
				gap: 2px;

				transition: 0.1s;

				&:hover {
					color: var(--tx2);
					background: var(--bg4-25);
					border-radius: var(--br-mx);
				}

				.icon,
				.counter {
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.counter {
					font-size: var(--fs-sm);
					padding: 0 2px;
				}
			}

			&.repeated {
				button {
					color: var(--repeat);

					&:hover {
						background: var(--repeat-05);
					}
				}
			}

			&.unrepeatable {
				button {
					color: var(--tx3);

					&:hover {
						background: none;
					}
				}
			}

			&.liked {
				button {
					color: var(--like);

					&:hover {
						background: var(--like-05);
					}
				}
			}

			&.loggedOut {
				opacity: 50%;
			}
		}
	}
</style>
