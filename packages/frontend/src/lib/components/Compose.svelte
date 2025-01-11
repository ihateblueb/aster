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

	let addDropdown: Dropdown;
	let visibilityDropdown: Dropdown;

	let self: any = $state({});
	function updateSelf() {
		let grabbedSelf = localstore.get('self');
		if (grabbedSelf) {
			self = JSON.parse(grabbedSelf);
		}
	}
	updateSelf();

	let note = $state({
		cw: '',
		content: '',
		visibility: 'public',
		repeat: '',
		replyingTo: ''
	});

	note.visibility = localstore.get('defaultVisibility');

	async function post() {
		if (note.content.length >= 1) {
			await createNote(note).then(() => {
				[note.cw, note.content, note.repeat, note.replyingTo] = '';
				note.visibility = localstore.get('defaultVisibility');
			});
		}
	}

	let replyingToNote: any = $state({});

	store.draft_replyingTo.subscribe(async (e) => {
		note.replyingTo = e;

		if (e.length > 0) {
			let grabbedNote = await getNote(e);
			if (grabbedNote) replyingToNote = grabbedNote;

			if (note.content.length >= 0)
				note.content += `@${grabbedNote.user.username}${grabbedNote.user.local ? '' : '@' + grabbedNote.user.host} `;
		}
	});

	function clearReply() {
		store.draft_replyingTo.set('');
		replyingToNote = undefined;
	}

	let quotingNote: any = $state({});

	store.draft_repeat.subscribe(async (e) => {
		note.repeat = e;

		if (e.length > 0) {
			let grabbedNote = await getNote(e);
			if (grabbedNote) quotingNote = grabbedNote;
		}
	});

	function clearQuote() {
		store.draft_repeat.set('');
		quotingNote = undefined;
	}

	function setVisibility(visibility: string) {
		note.visibility = visibility;
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
			<Button transparent centered nm>
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
	<DropdownItem>
		<IconPaperclip size="var(--fs-lg)" />
		Add file
	</DropdownItem>
	<DropdownItem>
		<IconChartBar size="var(--fs-lg)" />
		Add poll
	</DropdownItem>
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
</style>
