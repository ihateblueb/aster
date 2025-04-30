<script lang="ts">
	let {
		to = '',
		submit = false,
		primary = false,
		secondary = false,
		quaternary = false,
		accent = false,
		accentLight = false,
		success = false,
		warn = false,
		danger = false,
		transparent = false,
		rounded = false,
		centered = false,
		nav = false,
		more = false,
		circle = false,
		wide = false,
		thin = false,
		header = false,
		nm = false,
		blur = false
	} = $props();

	let btnClass =
		'btn' +
		(primary ? ' primary' : '') +
		(secondary ? ' secondary' : '') +
		(quaternary ? ' quaternary' : '') +
		(accent ? ' accent' : '') +
		(accentLight ? ' accentLight' : '') +
		(success ? ' success' : '') +
		(warn ? ' warn' : '') +
		(danger ? ' danger' : '') +
		(transparent ? ' transparent' : '') +
		(rounded ? ' rounded' : '') +
		(nav ? ' nav' : '') +
		(more ? ' more' : '') +
		(circle ? ' circle' : '') +
		(centered ? ' centered' : '') +
		(wide ? ' wide' : '') +
		(thin ? ' thin' : '') +
		(header ? ' header' : '') +
		(nm ? ' nm' : '') +
		(blur ? ' blur' : '');
</script>

{#if to}
	<a href={to} class={btnClass}>
		<slot></slot>
	</a>
{:else}
	<button type={submit ? 'submit' : 'button'} class={btnClass} on:click>
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

		color: var(--tx1);
		background-color: var(--bg3);

		&:hover {
			color: var(--tx1);
			background-color: var(--bg3-75);
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
		&.header {
			padding: 0;
			background: none;
			box-shadow: none;

			&:hover {
				opacity: 75%;
			}
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
		&.more {
			box-shadow: none;
			background: none;
			transition: 0.1s;

			&:hover {
				background: var(--bg3);
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
