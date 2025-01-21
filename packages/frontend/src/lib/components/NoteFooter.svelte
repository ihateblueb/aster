<script lang="ts">
	import {
		IconAlertCircle,
		IconArrowBackUp,
		IconBellOff,
		IconBookmark,
		IconCopy,
		IconDots,
		IconInfoCircle,
		IconLink,
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
	import repeatNote from '$lib/api/note/repeat.js';
	import localstore from '$lib/localstore.js';
	import deleteNote from '$lib/api/note/delete.js';
	import { page } from '$app/state';
	import likeNote from '$lib/api/note/like.js';
	import playSound from '$lib/sounds.js';

	let self: any = $state();
	function updateSelf() {
		let grabbedSelf = localstore.get('self');
		if (grabbedSelf) {
			self = JSON.parse(grabbedSelf);
		}
	}
	updateSelf();

	let { note } = $props();

	let didIRepeat = $state(false);
	let didILike = $state(false);

	function reply() {
		store.draft_replyingTo.set(note?.id);
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
	function react() {}

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

<footer>
	<div class={'item' + (self ? '' : ' loggedOut')}>
		<button on:click={() => reply()}>
			<span class="icon">
				<IconArrowBackUp size="20px" />
			</span>
			{#if note.replies && note.replies.length > 0}
				<span class="counter">{note.replies.length}</span>
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
				<span class="counter">{note.repeats.length}</span>
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
				<span class="counter">{note.likes.length}</span>
			{/if}
		</button>
	</div>
	<div class={'item' + (self ? '' : ' loggedOut')}>
		<button on:click={(e) => reactDropdown.open(e)}>
			<span class="icon">
				<IconPlus size="20px" />
			</span>
		</button>
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
		<IconRepeat size="var(--fs-lg)" />
		<span>Repeat</span>
	</DropdownItem>
	<DropdownItem on:click={() => quote()}>
		<IconQuote size="var(--fs-lg)" />
		<span>Quote</span>
	</DropdownItem>
</Dropdown>

<!-- React Dropdown -->
<Dropdown bind:this={reactDropdown}>React dropdown will be here</Dropdown>

<!-- More Dropdown -->
<Dropdown bind:this={moreDropdown}>
	<DropdownItem to={'/notes/' + note.id}>
		<IconInfoCircle size="var(--fs-lg)" />
		<span>Details</span>
	</DropdownItem>
	<DropdownDivider />
	<DropdownItem on:click={() => navigator.clipboard.writeText(note.content)}>
		<IconCopy size="var(--fs-lg)" />
		<span>Copy content</span>
	</DropdownItem>
	<DropdownItem
		on:click={() =>
			navigator.clipboard.writeText(page.url.href + 'notes/' + note.id)}
	>
		<IconLink size="var(--fs-lg)" />
		<span>Copy link</span>
	</DropdownItem>
	<DropdownItem on:click={() => navigator.clipboard.writeText(note.apId)}>
		<IconLink size="var(--fs-lg)" />
		<span>Copy link (origin)</span>
	</DropdownItem>
	<DropdownDivider />
	<DropdownItem>
		<IconBellOff size="var(--fs-lg)" />
		<span>Mute thread</span>
	</DropdownItem>
	<DropdownItem>
		<IconBookmark size="var(--fs-lg)" />
		<span>Bookmark</span>
	</DropdownItem>
	<DropdownItem>
		<IconAlertCircle size="var(--fs-lg)" />
		<span>Report</span>
	</DropdownItem>
	{#if note.user.id === self.id}
		<DropdownDivider />
		<DropdownItem>
			<IconPencil size="var(--fs-lg)" />
			<span>Edit</span>
		</DropdownItem>
		<DropdownItem danger on:click={() => moreDelete()}>
			<IconTrash size="var(--fs-lg)" />
			<span>Delete</span>
		</DropdownItem>
	{:else if self.admin}
		<DropdownDivider />
		<DropdownItem danger on:click={() => moreDelete()}>
			<IconTrash size="var(--fs-lg)" />
			<span>Delete</span>
		</DropdownItem>
	{/if}
</Dropdown>

<style lang="scss" scoped>
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
