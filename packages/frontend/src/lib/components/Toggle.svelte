<script lang="ts">
	import * as uuid from 'uuid';

	export let checked = false;
	export let label = '';

	const id = uuid.v4();
</script>

<div class="toggle">
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
	}
</style>
