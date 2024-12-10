<script>
	import {
		IconArrowBackUp,
		IconDots,
		IconPlus,
		IconRepeat,
		IconStar
	} from '@tabler/icons-svelte';
	import { bounceInOut } from 'svelte/easing';
	import store from '$lib/store';

	let animation = bounceInOut(1);

	export let note;

	function reply() {
		store.draft_replyingTo.set(note?.id);
	}

	function repeat() {}
	function quote() {}
	function like() {}
	function react() {}
</script>

<footer>
	<div class="item">
		<button on:click={() => reply()}>
			<span class="icon">
				<IconArrowBackUp size="20px" />
			</span>
			{#if note.replies && note.replies.length > 0}
				<span class="counter">{note.replies.length}</span>
			{/if}
		</button>
	</div>
	<div class="item">
		<button>
			<span class="icon">
				<IconRepeat size="20px" />
			</span>
			{#if note.repeats && note.repeats.length > 0}
				<span class="counter">{note.repeats.length}</span>
			{/if}
		</button>
	</div>
	<div class="item">
		<button>
			<span class="icon">
				<IconStar size="20px" />
			</span>
			{#if note.likes && note.likes.length > 0}
				<span class="counter">{note.likes.length}</span>
			{/if}
		</button>
	</div>
	<div class="item">
		<button>
			<span class="icon">
				<IconPlus size="20px" />
			</span>
		</button>
	</div>
	<div class="item">
		<button>
			<span class="icon">
				<IconDots size="20px" />
			</span>
		</button>
	</div>
</footer>

<style lang="scss">
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
		}
	}
</style>
