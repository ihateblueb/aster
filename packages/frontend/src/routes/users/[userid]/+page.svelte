<script>
	import { page } from '$app/stores';

	export let data;
</script>

<div class="userHeader">
	<img class="banner" src={data.banner} />
	<div class="innerHeader">
		<div class:cat={data.is_cat}>
			<img class="avatar" src={data.avatar} />
			{#if data.is_cat}
				<div class="ears">
					<div class="earLeft"></div>
					<div class="earRight"></div>
				</div>
			{/if}
		</div>
		<div class="name">
			<span class="displayname">{data.displayname}</span>
			<span class="username">@{data.username}</span>
		</div>
		<p>{data.bio}</p>
	</div>
</div>

<style lang="scss">
	/* cat ears stolen from misskey MkAvatar component */

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

	.userHeader {
		.banner {
			height: 125px;
			width: 100%;
			object-fit: cover;
		}
		.innerHeader {
			padding: 12px;
			margin-top: -45px;
			.avatar {
				position: relative;
				z-index: 100;
				height: 55px;
				width: 55px;
				border-radius: 10px;
			}
			.cat {
				position: relative;
				display: inline-block;
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
			.name {
				> span {
					display: block;
					&.displayname {
						font-weight: 700;
						font-size: 18px;
					}
				}
			}
		}
	}
</style>
