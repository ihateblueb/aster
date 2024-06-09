<script lang="ts">
	/*
		i am the worlds worst frontend developer so like a bit of the dropdown code is from here.
		https://codeberg.org/ShittyKopper/outpost/src/branch/mastoapi-fe/src/lib/components/Dropdown.svelte
	*/

	import { tick } from 'svelte';

	let dialog: HTMLDialogElement;

	let top: Number;
	let left: Number;

	let show = false;

	export async function open(e: MouseEvent) {
		if (!show) {
			show = true;

			top = (e.target as HTMLElement).offsetTop + 25;
			left = (e.target as HTMLElement).offsetLeft;

			tick().then(() => {
				dialog.showModal();
			});
		}
	}

	export function close() {
		dialog.close();
	}
</script>

<template>
	<dialog
		style={'top: ' + top + 'px; left: ' + left + 'px'}
		bind:this={dialog}
		on:click={close}
		on:close={() => (show = false)}
		class:show
	>
		<slot></slot>
	</dialog>
</template>

<style lang="scss">
	.show {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	dialog {
		position: absolute;

		margin: 0px;
		padding: 6px;

		box-shadow: 0px 0px 15px #00000025;
		background-color: var(--bg-secondary);
		color: var(--txt-secondary);
		font-size: var(--font-s);

		border-radius: var(--border-m);
		border: none;

		min-width: 175px;

		&::backdrop {
			background-color: transparent;
		}
	}
</style>
