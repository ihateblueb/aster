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

	export let width = '200px';

	let dialog: HTMLDialogElement;
	let target: EventTarget;

	let top: Number;
	let left: Number;

	let maxWidth: Number;
	let maxHeight: Number;

	let show = false;

	export async function open(e: MouseEvent) {
		if (!show && e.target) {
			show = true;
			target = e.target;

			await tick();

			updatePosition();

			tick().then(() => {
				dialog.showModal();
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
		dialog.close();
	}
</script>

<svelte:window on:resize={updatePosition} />

<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if show}
	<dialog
		class="dropdown"
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
		min-width: 225px;

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

			padding: 10px 10px max(10px, env(safe-area-inset-bottom)) 10px !important;
			border-radius: var(--br-lg) var(--br-lg) 0 0 !important;

			&::backdrop {
				background-color: #00000050;
			}
		}
	}
</style>
