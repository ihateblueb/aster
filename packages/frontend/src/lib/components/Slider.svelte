<script lang="ts">
	import * as uuid from 'uuid';

	let { label = '', min = 0, max = 100, step = 5, value = 50 } = $props();

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
