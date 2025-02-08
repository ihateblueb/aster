<script lang="ts">
	import * as uuid from 'uuid';

	let { label = '', checked = $bindable(false), nm = false } = $props();

	const id = uuid.v4();
</script>

<div class={'toggle' + (nm ? ' nm' : '')}>
	<input type="checkbox" {id} bind:checked on:change />
	{#if label}
		<label for={id} class="label">
			{label}
		</label>
	{/if}
</div>

<style lang="scss" scoped>
	.toggle {
		display: flex;
		align-items: center;

		margin: 5px 0;
		gap: 5px;

		&.nm {
			margin: 0;
		}
	}
</style>
