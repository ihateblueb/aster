<script lang="ts">
	export let danger = false;

	export let to = '';

	function calculateClass() {
		return 'dropdownItem' + (danger ? ' danger' : '');
	}
</script>

{#if to && to.length > 0}
	<a class={calculateClass()} href={to}>
		<slot></slot>
	</a>
{:else}
	<button class={calculateClass()} on:click>
		<slot></slot>
	</button>
{/if}

<style lang="scss" scoped>
	.dropdownItem {
		display: flex;
		align-items: center;

		padding: 7px 12px;
		gap: 6px;

		width: 100%;
		box-sizing: border-box;
		text-decoration: none;

		border: none;
		border-radius: var(--br-md);

		color: var(--tx2);
		background: transparent;
		font-size: var(--fs-md);
		font-family: var(--font);

		transition: 0s;
		cursor: pointer;

		&:hover {
			color: var(--ac1);
			background: var(--ac1-25);
		}

		&.danger {
			color: var(--danger);

			&:hover {
				background: var(--danger-25);
			}
		}
	}
</style>
