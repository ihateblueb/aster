<script>
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import Avatar from '$lib/components/Avatar.svelte';
	import localstore from '$lib/localstore';

	import {
		IconChartBar,
		IconMoodSmile,
		IconPaperclip
	} from '@tabler/icons-svelte';
	import Visibility from '$lib/components/Visibility.svelte';

	let self;

	function updateSelf() {
		let grabbedSelf = localstore.get('self');

		if (grabbedSelf) {
			self = JSON.parse(grabbedSelf);
		}
	}

	updateSelf();

	let note = {
		cw: '',
		content: '',
		visibility: localstore.get('defaultVisibility')
	};
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
	<Input placeholder="Content warning" bind:value={note.cw} wide></Input>
	<Input placeholder="What's going on?" bind:value={note.content} wide big
	></Input>
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
			<Button nm>Post</Button>
		</div>
	</div>
</div>

<style lang="scss" scoped>
	.compose {
		.top {
			margin-bottom: 10px;
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
