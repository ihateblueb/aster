<script>
	export let short = false;
	export let selected = false;
	export let title = '';
</script>

<button class={'tab' + (short ? ' short' : '')} on:click>
	<slot></slot>
	<span class={'title' + (selected ? ' selected' : '')}>{title}</span>
	<span class={'bar' + (selected ? ' show' : '')}> </span>
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

		font-family: var(--font);
		font-size: 13px;

		height: 50px;

		&.short {
			height: 45px;
		}

		.title {
			font-family: var(--font);
			line-height: var(--fs-lg);

			&.selected {
				color: var(--ac1);
			}
		}

		.bar {
			position: absolute;
			opacity: 0;
			width: 0;
			height: 4px;
			border-radius: var(--br-mx);
			background-color: var(--ac1);
			min-width: var(--br-md);

			bottom: 0;

			transition:
				width 0.2s ease,
				opacity 0.1s ease;

			&.show {
				opacity: 1;
				width: 30px;
			}
		}
	}
</style>
