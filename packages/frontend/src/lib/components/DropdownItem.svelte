<script lang="ts">
	let { to = '', danger = false, warn = false } = $props();

	let dropdownItemClass =
		'dropdownItem' + (danger ? ' danger' : '') + (warn ? ' warn' : '');
</script>

{#if to && to.length > 0}
	<a class={dropdownItemClass} href={to}>
		<slot></slot>
	</a>
{:else}
	<button class={dropdownItemClass} on:click>
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

		&.warn {
			color: var(--warn);

			&:hover {
				background: var(--warn-25);
			}
		}
	}
</style>
