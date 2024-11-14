<script>
	import {
		blur,
		crossfade,
		draw,
		fade,
		fly,
		scale,
		slide
	} from 'svelte/transition';

	export let selected;
</script>

<button class="tab" on:click>
	<slot></slot>
	<span
		class={'bar' + (selected ? ' show' : '')}
		in:slide={{ axis: 'x', duration: 200 }}
	></span>
</button>

<style lang="scss" scoped>
	.tab {
		display: flex;
		align-items: center;
		justify-content: center;

		position: relative;

		background: none;
		border: none;
		color: inherit;

		.bar {
			position: absolute;

			width: 0;
			height: 4px;
			border-radius: var(--br-xxs);
			background-color: var(--ac1);

			top: calc(50px - 18px);

			&.show {
				width: calc(50px - 18px);
			}
		}
	}
</style>
