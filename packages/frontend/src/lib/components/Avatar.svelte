<script>
	import localstore from '$lib/localstore';

	let {
		user,
		size = '45px',
		small = false,
		large = false,
		link = true
	} = $props();

	let rounded = localstore.getParsed('useRoundedAvatars');
</script>

{#snippet image()}
	<div
		class={'imageWrapper' +
			(small ? ' small' : '') +
			(large ? ' large' : '')}
	>
		<img
			class={'avatar' +
				(rounded ? ' rounded' : '') +
				(user?.sensitive ? ' blurred' : '')}
			style={`height:${size};width:${size};`}
			src={user?.avatar ?? '/fallback/avatar.png'}
			alt={user?.avatarAlt}
			on:error={(e) => {
				if (e && e.target) e.target.src = '/fallback/avatar.png';
			}}
		/>
	</div>
	{#if user.isCat}
		<div class="ears">
			<div class="earLeft"></div>
			<div class="earRight"></div>
		</div>
	{/if}
{/snippet}

{#if link}
	<a
		class="avatarCtn"
		href={'/@' + user.username + (user.local ? '' : '@' + user.host)}
	>
		{@render image()}
	</a>
{:else}
	<div class="avatarCtn">
		{@render image()}
	</div>
{/if}

<style lang="scss" scoped>
	/*
	 * Cat ears taken from Misskey
	 * https://github.com/misskey-dev/misskey/blob/develop/packages/frontend/src/components/global/MkAvatar.vue
	 */

	.avatarCtn {
		position: relative;
		display: flex;
		align-items: center;

		width: min-content;
		border-radius: var(--br-md);

		color: var(--tx1);

		.imageWrapper {
			position: inherit;
			display: inherit;
			align-items: inherit;

			color: var(--tx1);

			overflow: clip;
			width: min-content;

			border-radius: var(--br-md);

			&.rounded {
				border-radius: 100%;
			}
			&.small {
				border-radius: var(--br-sm);
			}
			&.large {
				border-radius: var(--br-lg);
			}

			.avatar {
				position: inherit;
				display: inherit;
				align-items: inherit;

				object-fit: cover;
				user-select: none;

				z-index: 2;

				border-radius: inherit;

				&.blurred {
					filter: blur(15px);
					transition: 0.1s;

					&:hover {
						filter: none;
					}
				}
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
