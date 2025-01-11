<script lang="ts">
	import * as uuid from 'uuid';

	export let label = '';
	export let min = 0;
	export let max = 100;
	export let step = 5;
	export let value = 50;

	const id = uuid.v4();
</script>

<div class="slider">
	{#if label}
		<label for={id} class="label">
			{label}
		</label>
	{/if}
	<input type="range" {id} {min} {max} {step} {value} on:change />
</div>

<style lang="scss" scoped>
	.slider {
		display: flex;

		margin: 5px 0;
		gap: 5px;
	}
</style>
