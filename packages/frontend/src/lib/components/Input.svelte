<script lang="ts">
	import * as uuid from 'uuid';

	export let value = '';
	export let placeholder = '';
	export let label = '';

	export let big: boolean = false;
	export let nm: boolean = false;
	export let wide: boolean = false;

	const id = uuid.v4();

	function calculateClass() {
		return (
			'ipt' +
			(big ? ' big' : '') +
			(nm ? ' nm' : '') +
			(wide ? ' wide' : '')
		);
	}
</script>

{#if label}
	<label for={id} class="lbl">{label}</label>
{/if}
{#if big}
	<textarea {id} {placeholder} class={calculateClass()} bind:value></textarea>
{:else}
	<input {id} {placeholder} class={calculateClass()} bind:value />
{/if}

<style lang="scss" scoped>
	.lbl {
		display: block;
		width: fit-content;

		font-size: var(--fs-sm);
		color: var(--tx2);

		margin-bottom: 5px;
	}
	.ipt {
		display: flex;
		align-items: center;
		box-sizing: border-box;
		gap: 6px;

		box-shadow:
			inset 0 -2px 3px #00000020,
			inset 0 -1px 1px #00000020,
			inset 0 1px 1px #ffffff05,
			inset 0 2px 3px #ffffff05;
		border: none;
		border-radius: var(--br-md);
		padding: 10px 14px;
		margin: 5px 0;

		font-family: var(--font);
		font-size: var(--fs-md);
		text-decoration: none;

		transition:
			0.1s,
			width 0s,
			height 0s;

		color: var(--tx1);
		background-color: var(--bg3);
		&:hover {
			color: var(--tx1);
			background-color: var(--bg3-75);
		}

		width: 275px;

		&.nm {
			margin: 0;
		}
		&.wide {
			width: 100%;
		}
	}
</style>
