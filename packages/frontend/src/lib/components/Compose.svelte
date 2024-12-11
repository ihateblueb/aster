<script>
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import Avatar from '$lib/components/Avatar.svelte';
	import localstore from '$lib/localstore';
	import {
		IconChartBar,
		IconMoodSmile,
		IconPaperclip,
		IconX
	} from '@tabler/icons-svelte';
	import Visibility from '$lib/components/Visibility.svelte';
	import createNote from '$lib/api/note/create';
	import store from '$lib/store';
	import getNote from '$lib/api/note/get';
	import Note from '$lib/components/Note.svelte';
	import NoteSimple from '$lib/components/NoteSimple.svelte';

	let self;
	function updateSelf() {
		let grabbedSelf = localstore.get('self');
		if (grabbedSelf) {
			self = JSON.parse(grabbedSelf);
		}
	}
	updateSelf();

	let result;
	let note = {
		cw: '',
		content: '',
		visibility: localstore.get('defaultVisibility'),
		repeat: '',
		replyingTo: ''
	};

	async function post() {
		if (note.content.length >= 1) {
			result = await createNote(note);
			console.log(result);
		}
	}

	let replyingToNote;

	store.draft_replyingTo.subscribe(async (e) => {
		note.replyingTo = e;

		if (e.length > 0) {
			let grabbedNote = await getNote(e);
			if (grabbedNote) replyingToNote = grabbedNote;
		}
	});

	function clearReply() {
		store.draft_replyingTo.set('');
		replyingToNote = undefined;
	}
</script>

<div class="compose">
	<div class="top">
		<div class="left">
			<Avatar user={self} size="35px" />
		</div>
		<div class="right">
			<Button transparent centered nm>
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
	<Input placeholder="Repeat ID" bind:value={note.repeat} wide></Input>
	<div class="btm">
		<div class="left">
			<Button transparent centered nm>
				<IconPaperclip size="var(--fs-lg)" />
			</Button>
			<Button transparent centered nm>
				<IconChartBar size="var(--fs-lg)" />
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

<style lang="scss" scoped>
	.compose {
		.top {
			margin-bottom: 10px;
		}
		.replyBox {
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
		.btm {
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
</style>
