<script lang="ts">
	import * as uuid from 'uuid';

	let {
		value = $bindable(),
		placeholder = $bindable(),
		label = $bindable(),
		type = $bindable(),
		big = false,
		nm = false,
		wide = false,
		required = false
	} = $props();

	const id = uuid.v4();

	let iptClass =
		'ipt' + (big ? ' big' : '') + (nm ? ' nm' : '') + (wide ? ' wide' : '');
</script>

<span>
	{#if label}
		<label for={id} class="lbl">{label}</label>
	{/if}
	{#if big}
		<textarea {id} {placeholder} {required} class={iptClass} bind:value
		></textarea>
	{:else}
		<input
			{type}
			{id}
			{placeholder}
			{required}
			class={iptClass}
			bind:value
		/>
	{/if}
</span>

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

		box-shadow: var(--funky-effect);
		border: none;
		border-radius: var(--br-md);
		padding: 8px 12px;
		margin: 5px 0;

		font-family: var(--font);
		font-feature-settings: var(--font-features);
		font-size: var(--fs-md);
		text-decoration: none;

		transition:
			0.1s,
			width 0s,
			height 0s,
			outline 0s;

		color: var(--tx1);
		background-color: var(--bg3);

		width: 275px;

		&:focus-visible {
			outline: 2px solid var(--ac1-50);
			outline-offset: 1px;
		}

		&.nm {
			margin: 0;
		}
		&.wide {
			width: 100%;
		}
		&.big {
			min-height: 100px;
			resize: vertical;
		}
	}
</style>
