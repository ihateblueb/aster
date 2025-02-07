<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import Avatar from '$lib/components/Avatar.svelte';
	import localstore from '$lib/localstore';
	import {
		IconChartBar,
		IconHome,
		IconLock,
		IconMail,
		IconMoodSmile,
		IconPaperclip,
		IconPlus,
		IconWorld,
		IconX
	} from '@tabler/icons-svelte';
	import Visibility from '$lib/components/Visibility.svelte';
	import createNote from '$lib/api/note/create';
	import store from '$lib/store';
	import getNote from '$lib/api/note/get';
	import NoteSimple from '$lib/components/NoteSimple.svelte';
	import Dropdown from './Dropdown.svelte';
	import DropdownItem from './DropdownItem.svelte';
	import playSound from '$lib/sounds.js';
	import NoteAttachment from '$lib/components/NoteAttachment.svelte';
	import EmojiDropdown from '$lib/components/dropdowns/EmojiDropdown.svelte';

	let addDropdown: undefined | Dropdown = $state();
	let emojiDropdown: undefined | Dropdown = $state();
	let visibilityDropdown: undefined | Dropdown = $state();

	// self state

	let self: any = $state({});
	function updateSelf() {
		let grabbedSelf = localstore.get('self');
		if (grabbedSelf) {
			self = JSON.parse(grabbedSelf);
		}
	}
	updateSelf();

	// note state

	let note: {
		cw: string;
		content: string;
		visibility: string;
		repeat: string;
		replyingTo: string;
		attachments: string[];
	} = $state({
		cw: '',
		content: '',
		visibility: 'public',
		repeat: '',
		replyingTo: '',
		attachments: []
	});

	let attachments: string[] = $state([]);

	function resetVisibility() {
		note.visibility = localstore.get('defaultVisibility');
	}

	function resetNote() {
		[note.cw, note.content, note.repeat, note.replyingTo] = '';
		note.attachments = [];
		attachments = [];
		resetVisibility();
	}

	function setVisibility(visibility: string) {
		note.visibility = visibility;
	}

	// actual post

	async function post() {
		if (note.content.length >= 1) {
			await createNote(note).then(() => {
				playSound('newNote');
				resetNote();
			});
		}
	}

	// other notes

	let replyingToNote: any = $state();

	store.draft_replyingTo.subscribe(async (e) => {
		note.replyingTo = e;

		if (e.length > 0) {
			let grabbedNote = await getNote(e);
			if (grabbedNote) {
				replyingToNote = grabbedNote;
				note.visibility = grabbedNote.visibility;
			}

			if (note.content.length <= 0)
				note.content = `@${grabbedNote.user.username}${grabbedNote.user.local ? '' : '@' + grabbedNote.user.host} `;
		}
	});

	function clearReply() {
		store.draft_replyingTo.set('');
		replyingToNote = undefined;
		resetVisibility();
	}

	let quotingNote: any = $state();

	store.draft_repeat.subscribe(async (e) => {
		note.repeat = e;

		if (e.length > 0) {
			let grabbedNote = await getNote(e);
			if (grabbedNote) {
				quotingNote = grabbedNote;
				note.visibility = grabbedNote.visibility;
			}
		}
	});

	function clearQuote() {
		store.draft_repeat.set('');
		quotingNote = undefined;
		resetVisibility();
	}

	store.selectedFiles.subscribe(async (e) => {
		if (e) {
			attachments = e;
			note.attachments = e.map((f) => {
				return f.id;
			});
		}
	});

	function removeAttachment(id: string) {
		store.selectedFiles.update((e) => e.filter((f) => f.id !== id));
		attachments = attachments.filter((f) => f !== id);
	}
</script>

<div class="compose">
	<div class="top">
		<div class="left">
			<Avatar user={self} size="35px" />
		</div>
		<div class="right">
			<Button
				transparent
				centered
				nm
				on:click={(e) => visibilityDropdown.open(e)}
			>
				<Visibility visibility={note.visibility} />
			</Button>
		</div>
	</div>

	{#if note.replyingTo && replyingToNote}
		<div class="replyBox">
			<div class="top">
				<p>
					Replying to @{replyingToNote.user.username}{replyingToNote
						.user.local
						? ''
						: '@' + replyingToNote.user.host}
				</p>
				<button class="nobg" on:click={() => clearReply()}>
					<IconX size="var(--fs-lg)" />
				</button>
			</div>
			<NoteSimple note={replyingToNote} />
		</div>
	{/if}

	<Input placeholder="Content warning" bind:value={note.cw} wide></Input>
	<Input placeholder="What's going on?" bind:value={note.content} wide big
	></Input>

	{#if attachments && attachments.length > 0}
		<div class="attachments">
			{#each attachments as attachment}
				<!--
				{#if attachment.type && attachment.type.startsWith('video')}
					video
				{:else if attachment.type && attachment.type.startsWith('audio')}
					audio
				{:else}

				{/if}
				-->
				<NoteAttachment small {attachment}>
					<button
						class="removeAttachment"
						on:click={() => removeAttachment(attachment.id)}
					>
						<IconX size="var(--fs-lg)" />
					</button>
				</NoteAttachment>
			{/each}
		</div>
	{/if}

	{#if note.repeat && quotingNote}
		<div class="quoteBox">
			<div class="top">
				<p>
					Quoting @{quotingNote.user.username}{quotingNote.user.local
						? ''
						: '@' + quotingNote.user.host}
				</p>
				<button class="nobg" on:click={() => clearQuote()}>
					<IconX size="var(--fs-lg)" />
				</button>
			</div>
			<NoteSimple note={quotingNote} />
		</div>
	{/if}

	<div class="btm">
		<div class="left">
			<Button
				transparent
				centered
				nm
				on:click={(e) => addDropdown.open(e)}
			>
				<IconPlus size="var(--fs-lg)" />
			</Button>
			<Button
				transparent
				centered
				nm
				on:click={(e) => emojiDropdown.open(e)}
			>
				<IconMoodSmile size="var(--fs-lg)" />
			</Button>
		</div>
		<div class="right">
			<Button
				accent={note.content.length >= 1}
				nm
				on:click={async () => await post()}>Post</Button
			>
		</div>
	</div>
</div>

<Dropdown bind:this={visibilityDropdown}>
	<DropdownItem on:click={() => setVisibility('public')}>
		<div class="visibilityOption">
			<p>
				<IconWorld size="var(--fs-lg)" />
				Public
			</p>
			<p>Shown on all timelines</p>
		</div>
	</DropdownItem>
	<DropdownItem on:click={() => setVisibility('unlisted')}>
		<div class="visibilityOption">
			<p>
				<IconHome size="var(--fs-lg)" />
				Unlisted
			</p>
			<p>Only shown on the home timeline of followers</p>
		</div>
	</DropdownItem>
	<DropdownItem on:click={() => setVisibility('followers')}>
		<div class="visibilityOption">
			<p>
				<IconLock size="var(--fs-lg)" />
				Followers
			</p>
			<p>Only shown to your followers</p>
		</div>
	</DropdownItem>
	<DropdownItem on:click={() => setVisibility('direct')}>
		<div class="visibilityOption">
			<p>
				<IconMail size="var(--fs-lg)" />
				Direct
			</p>
			<p>Only shown to those mentioned</p>
		</div>
	</DropdownItem>
</Dropdown>

<Dropdown bind:this={addDropdown}>
	<DropdownItem on:click={() => store.showDrive.set(true)}>
		<IconPaperclip size="var(--fs-lg)" />
		Add file
	</DropdownItem>
	<DropdownItem>
		<IconChartBar size="var(--fs-lg)" />
		Add poll
	</DropdownItem>
</Dropdown>

<Dropdown bind:this={emojiDropdown} emoji>
	<EmojiDropdown
		on:emojiSelected={(e) => (note.content += ':' + e.detail + ':')}
	/>
</Dropdown>

<style lang="scss" scoped>
	.compose {
		.top {
			margin-bottom: 10px;
		}

		.replyBox,
		.quoteBox {
			.top {
				display: flex;
				align-items: center;
				gap: 10px;

				p {
					flex-grow: 1;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}
			}
		}

		.attachments {
			display: flex;
			flex-direction: column;
			gap: 4px;
			margin-top: 10px;
			border-radius: var(--br-md);
			overflow: clip;
		}

		.btm,
		.quoteBox {
			margin-top: 10px;
		}

		.btm,
		.top {
			display: flex;
			align-items: center;
			gap: 10px;
			.left {
				display: flex;
				align-items: center;
				overflow-x: scroll;
				flex-grow: 1;
			}
			.right {
				display: flex;
				align-items: center;
			}
		}
	}

	.visibilityOption {
		display: flex;
		align-items: start;
		text-align: left;
		flex-direction: column;

		p {
			display: flex;
			align-items: center;
			gap: 5px;

			&:last-child {
				margin-top: 4px;
				color: var(--tx3);
				font-size: var(--fs-sm);
			}
		}
	}

	.removeAttachment {
		display: flex;
		align-items: center;
		justify-content: center;

		border: none;
		background-color: var(--danger-25);
		backdrop-filter: blur(var(--blur-sm));
		border-radius: var(--br-sm);
		color: var(--danger);
		padding: 4px;

		transition: 0.1s;
		cursor: pointer;

		&:hover {
			color: var(--danger-50);
		}
	}
</style>
