<script lang="ts">
	import { tick } from 'svelte';
	import { scale, fade } from 'svelte/transition';

	let dialog: HTMLDialogElement;
	let target: EventTarget;

	let show = false;

	export async function open() {
		if (!show) {
			show = true;

			await tick();

			tick().then(() => {
				dialog.showModal();
			});
		}
	}

	export function close() {
		dialog.close();
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
{#if show}
	<div class="modalCtn">
		<dialog
			class={'modal' + (show ? ' show' : '')}
			bind:this={dialog}
			on:close={() => (show = false)}
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

		.modal {
			display: flex;

			flex-direction: column;
			justify-content: center;
			align-items: center;

			min-width: 345px;
			min-height: 135px;

			max-width: 450px;

			margin: auto;
			padding: 26px 20px;

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

			&::backdrop {
				display: none;
			}
		}

		.backdrop {
			width: 100%;
			height: 100%;

			background-color: var(--bg1-75);
		}
	}
</style>
