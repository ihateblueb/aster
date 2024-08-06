<script lang="ts">
	/*
		i am the worlds worst frontend developer so like a bit of the dropdown code is from here.
		https://codeberg.org/ShittyKopper/outpost/src/branch/mastoapi-fe/src/lib/components/Dropdown.svelte
	*/

	import { tick } from 'svelte';

	import {
		computePosition,
		offset,
		shift,
		flip,
		size
	} from '@floating-ui/dom';

	let dialog: HTMLDialogElement;
	let target;

	let top: Number;
	let left: Number;

	let maxWidth: Number;
	let maxHeight: Number;

	let show = false;

	export async function open(e: MouseEvent) {
		if (!show) {
			show = true;
			target = e.target;

			updatePosition();

			tick().then(() => {
				dialog.showModal();
			});
		}
	}

	function updatePosition() {
		computePosition(target, dialog, {
			middleware: [
				shift(),
				offset(10),
				flip(),
				size({
					apply({ availableWidth, availableHeight }) {
						maxWidth = availableWidth;
						maxHeight = availableHeight - 22; // 10px off of bottom
					}
				})
			]
		}).then(({ x, y }) => {
			left = x;
			top = y;
		});
	}

	export function close() {
		dialog.close();
	}
</script>

<!--
	TODO: this is not very preformant!
 its worse than drafts!
 this is also causing a lot of element is undefined errors.
 if the dropdown is in drawer mode it shouldnt
 even be updating at all
 -->

<svelte:window on:resize={updatePosition} />

<template>
	<dialog
		style={'top: ' +
			top +
			'px; left: ' +
			left +
			'px; max-width: ' +
			maxWidth +
			'px; max-height: ' +
			maxHeight +
			'px;'}
		bind:this={dialog}
		on:click={close}
		on:close={() => (show = false)}
		class={'_91qW7WV' + (show ? ' show' : '')}
	>
		<slot></slot>
	</dialog>
</template>
