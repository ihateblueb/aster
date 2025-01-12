<script>
	let { user, size = '45px', small = false, large = false } = $props();
</script>

<a href={'/@' + user.username + (user.local ? '' : '@' + user.host)}>
	<img
		class={'avatar' + (small ? ' small' : '') + (large ? ' large' : '')}
		style={`height:${size};width:${size};`}
		src={user?.avatar ?? '/fallback/avatar.png'}
		alt={user?.avatarAlt}
		on:error={(e) => {
			if (e && e.target) e.target.src = '/fallback/avatar.png';
		}}
	/>
	{#if user.isCat}
		<div class="ears">
			<div class="earLeft"></div>
			<div class="earRight"></div>
		</div>
	{/if}
</a>

<style lang="scss" scoped>
	/*
	 * Cat ears taken from Misskey
	 * https://github.com/misskey-dev/misskey/blob/develop/packages/frontend/src/components/global/MkAvatar.vue
	 */

	a {
		position: relative;
		display: flex;
		align-items: center;

		width: min-content;
		border-radius: var(--br-md);

		color: var(--tx1);

		.avatar {
			position: relative;
			display: flex;
			align-items: center;

			border-radius: var(--br-md);
			user-select: none;

			z-index: 2;

			&.small {
				border-radius: var(--br-sm);
			}

			&.large {
				border-radius: var(--br-lg);
			}
		}

		.ears {
			contain: strict;
			position: absolute;
			z-index: 1;
			display: flex;

			top: -50%;
			left: -50%;
			width: 100%;
			height: 100%;
			padding: 50%;

			pointer-events: none;

			.earLeft,
			.earRight {
				contain: strict;
				display: inline-block;
				height: 50%;
				width: 50%;
				background: currentColor;

				&::after {
					contain: strict;
					content: '';
					display: block;
					width: 60%;
					height: 60%;
					margin: 20%;
					background: #df548f;
				}
			}

			.earLeft {
				transform: rotate(37.5deg) skew(30deg);

				&,
				&::after {
					border-radius: 25% 75% 75%;
				}
			}

			.earRight {
				transform: rotate(-37.5deg) skew(-30deg);

				&,
				&::after {
					border-radius: 75% 25% 75% 75%;
				}
			}
		}

		&:hover {
			.ears {
				.earLeft {
					animation: earwiggleleft 1s infinite;
				}
				.earRight {
					animation: earwiggleright 1s infinite;
				}
			}
		}
	}

	@keyframes earwiggleleft {
		from {
			transform: rotate(37.6deg) skew(30deg);
		}
		25% {
			transform: rotate(10deg) skew(30deg);
		}
		50% {
			transform: rotate(20deg) skew(30deg);
		}
		75% {
			transform: rotate(0deg) skew(30deg);
		}
		to {
			transform: rotate(37.6deg) skew(30deg);
		}
	}

	@keyframes earwiggleright {
		from {
			transform: rotate(-37.6deg) skew(-30deg);
		}
		30% {
			transform: rotate(-10deg) skew(-30deg);
		}
		55% {
			transform: rotate(-20deg) skew(-30deg);
		}
		75% {
			transform: rotate(0deg) skew(-30deg);
		}
		to {
			transform: rotate(-37.6deg) skew(-30deg);
		}
	}

	@keyframes eartightleft {
		from {
			transform: rotate(37.6deg) skew(30deg);
		}
		50% {
			transform: rotate(37.4deg) skew(30deg);
		}
		to {
			transform: rotate(37.6deg) skew(30deg);
		}
	}

	@keyframes eartightright {
		from {
			transform: rotate(-37.6deg) skew(-30deg);
		}
		50% {
			transform: rotate(-37.4deg) skew(-30deg);
		}
		to {
			transform: rotate(-37.6deg) skew(-30deg);
		}
	}
</style>
