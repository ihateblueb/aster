<script lang="ts">
	export let to = '';

	export let primary: boolean = false; // --bg1
	export let secondary: boolean = false; // --bg2
	export let tertiary: boolean = false; // --bg3
	export let quaternary: boolean = false; // --bg4
	export let accent: boolean = false;
	export let success: boolean = false;
	export let warn: boolean = false;
	export let danger: boolean = false;
	export let rounded: boolean = false;
	export let centered: boolean = false;
	export let wide: boolean = false;
	export let nm: boolean = false;

	function calculateClass() {
		if (
			!(
				primary ||
				secondary ||
				tertiary ||
				quaternary ||
				accent ||
				success ||
				warn ||
				danger
			)
		) {
			tertiary = true;
		}
		return (
			'btn' +
			(primary ? ' primary' : '') +
			(secondary ? ' secondary' : '') +
			(tertiary ? ' tertiary' : '') +
			(quaternary ? ' quaternary' : '') +
			(accent ? ' accent' : '') +
			(success ? ' success' : '') +
			(warn ? ' warn' : '') +
			(danger ? ' danger' : '') +
			(rounded ? ' rounded' : '') +
			(centered ? ' centered' : '') +
			(wide ? ' wide' : '') +
			(nm ? ' nm' : '')
		);
	}
</script>

{#if to}
	<a href={to} class={calculateClass()}>
		<slot></slot>
	</a>
{:else}
	<button class={calculateClass()} on:click>
		<slot></slot>
	</button>
{/if}

<style lang="scss" scoped>
	.btn {
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

		transition: 0.1s;

		&.nm {
			margin: 0;
		}

		&.primary {
			color: var(--tx1);
			background-color: var(--bg1);

			&:hover {
				color: var(--tx1);
				background-color: var(--bg1-75);
			}
		}
		&.secondary {
			color: var(--tx1);
			background-color: var(--bg2);

			&:hover {
				color: var(--tx1);
				background-color: var(--bg2-75);
			}
		}
		&.tertiary {
			color: var(--tx1);
			background-color: var(--bg3);

			&:hover {
				color: var(--tx1);
				background-color: var(--bg3-75);
			}
		}
		&.quaternary {
			color: var(--tx1);
			background-color: var(--bg4);

			&:hover {
				color: var(--tx1);
				background-color: var(--bg4-75);
			}
		}
		&.accent {
			color: var(--tx1);
			background-color: var(--ac1);

			&:hover {
				color: var(--tx1);
				background-color: var(--ac1-75);
			}
		}
		&.success {
			color: var(--tx1);
			background-color: var(--success);

			&:hover {
				color: var(--tx1);
				background-color: var(--success-75);
			}
		}
		&.warn {
			color: var(--tx1);
			background-color: var(--warn);

			&:hover {
				color: var(--tx1);
				background-color: var(--warn-75);
			}
		}
		&.danger {
			color: var(--tx1);
			background-color: var(--danger);

			&:hover {
				color: var(--tx1);
				background-color: var(--danger-75);
			}
		}

		&.wide {
			width: 100%;
		}
		&.rounded {
			border-radius: var(--br-mx);
		}
		&.centered {
			justify-content: center;
		}
	}
</style>
