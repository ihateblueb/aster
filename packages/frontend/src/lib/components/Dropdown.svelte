<script lang="ts">
	/*
		i am the worlds worst frontend developer so like a bit of the dropdown code is from here.
		https://codeberg.org/ShittyKopper/outpost/src/branch/mastoapi-fe/src/lib/components/Dropdown.svelte
	*/

	import { tick } from 'svelte';

	import { computePosition, offset, shift } from '@floating-ui/dom';

	let dialog: HTMLDialogElement;
	let target;

	let top: Number;
	let left: Number;

	let show = false;

	export async function open(e: MouseEvent) {
		console.log(e);
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
			middleware: [shift(), offset(10)]
		}).then(({ x, y }) => {
			left = x;
			top = y;
		});
	}

	export function close() {
		dialog.close();
	}
</script>

<svelte:window on:resize={(e) => updatePosition(e)} />

<template>
	<dialog
		style={'top: ' + top + 'px; left: ' + left + 'px'}
		bind:this={dialog}
		on:click={close}
		on:close={() => (show = false)}
		class={'_91qW7WV' + (show ? ' show' : '')}
	>
		<slot></slot>
	</dialog>
</template>
