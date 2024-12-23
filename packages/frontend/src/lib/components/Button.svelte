<script lang="ts">
	export let to: string = '';
	export let submit: boolean = false;

	export let primary: boolean = false; // --bg1
	export let secondary: boolean = false; // --bg2
	export let tertiary: boolean = false; // --bg3
	export let quaternary: boolean = false; // --bg4
	export let accent: boolean = false;
	export let accentLight: boolean = false;
	export let success: boolean = false;
	export let warn: boolean = false;
	export let danger: boolean = false;
	export let transparent: boolean = false;
	export let rounded: boolean = false;
	export let centered: boolean = false;
	export let nav: boolean = false;
	export let circle: boolean = false;
	export let wide: boolean = false;
	export let thin: boolean = false;
	export let nm: boolean = false;
	export let blur: boolean = false;

	function calculateClass() {
		if (
			!(
				primary ||
				secondary ||
				tertiary ||
				quaternary ||
				accent ||
				accentLight ||
				success ||
				warn ||
				danger ||
				transparent
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
			(accentLight ? ' accentLight' : '') +
			(success ? ' success' : '') +
			(warn ? ' warn' : '') +
			(danger ? ' danger' : '') +
			(transparent ? ' transparent' : '') +
			(rounded ? ' rounded' : '') +
			(nav ? ' nav' : '') +
			(circle ? ' circle' : '') +
			(centered ? ' centered' : '') +
			(wide ? ' wide' : '') +
			(thin ? ' thin' : '') +
			(nm ? ' nm' : '') +
			(blur ? ' blur' : '')
		);
	}
</script>

{#if to}
	<a href={to} class={calculateClass()}>
		<slot></slot>
	</a>
{:else}
	<button
		type={submit ? 'submit' : 'button'}
		class={calculateClass()}
		on:click
	>
		<slot></slot>
	</button>
{/if}

<style lang="scss" scoped>
	.btn {
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
		min-height: 35px;

		&:focus-visible {
			outline: 2px solid var(--ac1-50);
			outline-offset: 1px;
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
			color: var(--ac1);
			background-color: var(--ac1-25);

			&:hover {
				color: var(--tx1);
				background-color: var(--ac1-50);
			}
		}
		&.accentLight {
			color: var(--ac1);
			background-color: var(--ac1-25);

			&:hover {
				color: var(--tx1);
				background-color: var(--ac1-50);
			}
		}
		&.success {
			color: var(--success);
			background-color: var(--success-25);

			&:hover {
				color: var(--tx1);
				background-color: var(--success-50);
			}
		}
		&.warn {
			color: var(--warn);
			background-color: var(--warn-25);

			&:hover {
				color: var(--tx1);
				background-color: var(--warn-50);
			}
		}
		&.danger {
			color: var(--danger);
			background-color: var(--danger-25);

			&:hover {
				color: var(--tx1);
				background-color: var(--danger-50);
			}
		}
		&.transparent {
			color: var(--tx1);
			background-color: transparent;
			box-shadow: none;

			&:hover {
				color: var(--tx1);
				background-color: var(--bg3-50);
			}
		}

		&.nm {
			margin: 0;
		}
		&.wide {
			width: 100%;
		}
		&.thin {
			min-height: 25px;
			padding: 6px 10px;
		}
		&.circle {
			height: 50px;
			width: 50px;
			justify-content: center;
			border-radius: var(--br-mx);
		}
		&.nav {
			width: 100%;
			height: 35px;

			box-shadow: none;
			background: none;
			transition: 0.1s;

			&:hover {
				color: var(--ac1);
				background: var(--ac1-25);
				box-shadow: var(--funky-effect);
			}
		}
		&.centered {
			justify-content: center;
		}
		&.rounded {
			border-radius: var(--br-mx);
		}
		&.blur {
			backdrop-filter: blur(10px);
		}
	}
</style>
