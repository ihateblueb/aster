<script lang="ts">
	import { tick } from 'svelte';

	import {
		computePosition,
		offset,
		shift,
		flip,
		size
	} from '@floating-ui/dom';

	import { scale } from 'svelte/transition';

	let { emoji = false, width = '200px' } = $props();

	let dialog: undefined | HTMLDialogElement = $state();
	let target: undefined | null | EventTarget = $state();

	let top: Number = $state(0);
	let left: Number = $state(0);

	let maxWidth: Number = $state(0);
	let maxHeight: Number = $state(0);

	let show = $state(false);

	export async function open(e: MouseEvent) {
		if (!show && e.currentTarget) {
			show = true;
			target = e.currentTarget;

			await tick();

			updatePosition();

			tick().then(() => {
				if (dialog) dialog.showModal();
			});
		}
	}

	function updatePosition() {
		if (target && dialog) {
			computePosition(target, dialog, {
				middleware: [
					shift(),
					offset(10),
					flip(),
					size({
						apply({ availableWidth, availableHeight }) {
							maxWidth = availableWidth;
							maxHeight = availableHeight - 22; // 10px off of bottom (?? where does this number come from)
						}
					})
				]
			}).then(({ x, y }) => {
				left = x;
				top = y;
			});
		}
	}

	export function close() {
		if (dialog) dialog.close();
	}
</script>

<svelte:window on:resize={updatePosition} />

<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if show}
	<dialog
		class={'dropdown' + (emoji ? ' emoji' : '')}
		style={'top:' +
			top +
			'px;left:' +
			left +
			'px;max-width:' +
			maxWidth +
			'px;max-height:' +
			maxHeight +
			'px;' +
			'width:' +
			width +
			';'}
		bind:this={dialog}
		on:click={close}
		on:close={() => (show = false)}
		transition:scale={{ duration: 180, start: 0.85 }}
	>
		<slot></slot>
	</dialog>
{/if}

<style lang="scss" scoped>
	.dropdown {
		position: fixed;

		margin: 0;
		padding: 6px;
		min-width: 200px;

		text-align: left;

		color: var(--tx1);
		background: var(--bg3);
		border: none;
		border-radius: var(--br-lg);
		box-shadow: 0 0 16px var(--bg1);

		&::backdrop {
			background-color: transparent;
		}

		&.show {
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		&.emoji {
			width: 300px !important;
			padding: 0px;
		}
	}

	@media screen and (max-width: 650px) {
		.dropdown {
			position: sticky;
			top: auto !important;
			left: auto !important;
			bottom: 0 !important;
			width: 100% !important;
			box-sizing: border-box !important;
			background-color: var(--bg2);
			font-size: var(--fs-md);

			padding: 12px 12px calc(12px + env(safe-area-inset-bottom)) 12px !important;
			border-radius: var(--br-lg) var(--br-lg) 0 0 !important;

			&::backdrop {
				background-color: #00000050;
			}
		}
	}
</style>
