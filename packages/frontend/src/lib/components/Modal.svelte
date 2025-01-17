<script lang="ts">
	import { tick } from 'svelte';
	import { scale, fade } from 'svelte/transition';
	import store from '$lib/store';

	let dialog: undefined | HTMLDialogElement = $state();

	let show = $state(false);

	let { wide = false, compose = false } = $props();

	export async function open() {
		if (!show) {
			show = true;

			await tick();

			tick().then(() => {
				if (dialog) dialog.showModal();
			});
		}
	}

	export function close() {
		if (dialog) dialog.close();
		show = false;
		if (compose) store.showCompose.set(false);
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
{#if show}
	<div class="modalCtn">
		<dialog
			class={'modal' + (show ? ' show' : '') + (wide ? ' wide' : '')}
			bind:this={dialog}
			on:close={() => close()}
			transition:scale={{ duration: 180, start: 0.85 }}
		>
			<div class="text">
				<slot name="text"></slot>
			</div>
			<div class="slot">
				<slot></slot>
			</div>
			<div class="buttons">
				<slot name="buttons"></slot>
			</div>
		</dialog>
		<div
			class="backdrop"
			on:click={() => close()}
			transition:fade={{ duration: 100 }}
		></div>
	</div>
{/if}

<style lang="scss" scoped>
	.modalCtn {
		position: absolute;

		width: 100%;
		height: 100%;

		top: 0;
		left: 0;
		box-sizing: border-box;

		z-index: 10;

		.modal {
			display: flex;

			flex-direction: column;
			justify-content: center;
			align-items: center;

			min-width: 345px;
			min-height: 135px;

			max-width: 450px;

			margin: auto;
			padding: 20px;

			color: var(--tx1);
			background: var(--bg2);
			border: none;
			border-radius: var(--br-lg);
			box-shadow: 0 0 20px 5px var(--bg1);

			.text,
			.buttons {
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.text {
				flex-direction: column;
				gap: 5px;
			}

			.slot {
				margin-top: 10px;
				width: 100%;
			}

			.buttons {
				margin-top: 10px;
				gap: 8px;
			}

			&.wide {
				max-width: 525px;
				// 20px inner padding * 2 + 20px for 10px buffer between screen edge
				width: calc(100vw - (20px * 3));
			}

			&::backdrop {
				display: none;
				pointer-events: none;
			}
		}

		.backdrop {
			width: 100%;
			height: 100%;

			pointer-events: auto;

			background-color: #00000050;
			backdrop-filter: blur(var(--blur-sm));
		}
	}
</style>
