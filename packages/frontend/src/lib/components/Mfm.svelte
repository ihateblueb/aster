<script>
	import * as mfm from 'mfm-js';

	export let content;
	export let simple = false;

	let mfmTree = [];

	if (simple) {
		mfmTree = mfm.parseSimple(content);
	} else {
		mfmTree = mfm.parse(content);
	}

	/*
		elements done:
		- text
		- bold
		- italic
		- strike
		- plain
		- center
		- small
		- url
		- link
		- blockquote
		- fn tada
		- fn jelly (animation needed)
		- fn twitch
		- fn shake
		- fn spin
		- fn jump
		- fn bounce
		- fn flip
		- fn x2
		- fn x3
		- fn x4
		- fn font
		- fn blur
		- fn rainbow
		- fn sparkle (does nothing rn but handled)
		- fn rotate
		- fn position
		- fn scale
		- fn fg
		- fn bg
		- fn border
		- fn plain
		- fn center
		- fn small

        elements todo:
		- hashtag
		- mention
		- math
		- inline math
		- code
		- inline code
		- emoji
		- search
		- ruby

        known issues:
        they dont stack.
		animations dont work although they are applied.
    */

	function renderEachChild(objChild, scale) {
		let collectedChildren = '';
		objChild.forEach((child) => {
			collectedChildren = collectedChildren + renderMfm(child, scale);
		});
		return collectedChildren;
	}

	function renderMfm(object, scale) {
		if (!scale) {
			scale = 1;
		}
		if (object.type === 'text') {
			return object.props.text.replace(/(\r\n|\n|\r)/g, '\n');
		} else if (object.type === 'bold') {
			return `<b style="display: inline-block;">${renderEachChild(object.children, scale)}</b>`;
		} else if (object.type === 'strike') {
			return `<s style="display: inline-block;">${renderEachChild(object.children, scale)}</ss>`;
		} else if (object.type === 'italic') {
			return `<i style="display: inline-block;">${renderEachChild(object.children, scale)}</i>`;
		} else if (object.type === 'plain') {
			return `<span style="display: inline-block;">${renderEachChild(object.children, scale)}</span>`;
		} else if (object.type === 'small') {
			return `<small style="opacity: 75%;">${renderEachChild(object.children, scale)}</small>`;
		} else if (object.type === 'center') {
			return `<span style="text-align: center;">${renderEachChild(object.children, scale)}</span>`;
		} else if (object.type === 'url') {
			return `<a href="${object.props.url}" rel="nofollow noopener">${object.props.url}</a>`;
		} else if (object.type === 'link') {
			return `<a href="${object.props.url}" rel="nofollow noopener">${renderEachChild(object.children, scale)}</a> <small style="font-size: 75%; color: var(--txt-tertiary);">(${object.props.url})</small>`;
		} else if (object.type === 'quote') {
			return `<blockquote class="mfm-quote">${renderEachChild(object.children, scale)}</blockquote>`;
		} else if (object.type === 'fn') {
			if (object.props.name === 'tada') {
				let speed = object.props.args.speed || '1s';
				let delay = object.props.args.delay || '0s';
				return `<span style="display: inline-block; animation: mfm-tada ${speed} linear infinite; animation-delay: ${delay}; font-size: 150%;">${renderEachChild(object.children, scale)}</span>`;
			} else if (object.props.name === 'jelly') {
				let speed = object.props.args.speed || '1s';
				let delay = object.props.args.delay || '0s';
				return `<span style="display: inline-block; animation: mfm-jel;y ${speed} linear infinite; animation-delay: ${delay};">${renderEachChild(object.children, scale)}</span>`;
			} else if (object.props.name === 'twitch') {
				let speed = object.props.args.speed || '1s';
				let delay = object.props.args.delay || '0s';
				return `<span style="display: inline-block; animation: mfm-twitch ${speed} linear infinite; animation-delay: ${delay};">${renderEachChild(object.children, scale)}</span>`;
			} else if (object.props.name === 'shake') {
				let speed = object.props.args.speed || '1s';
				let delay = object.props.args.delay || '0s';
				return `<span style="display: inline-block; animation: mfm-shake ${speed} linear infinite; animation-delay: ${delay};">${renderEachChild(object.children, scale)}</span>`;
			} else if (object.props.name === 'spin') {
				let direction = object.props.args.left
					? 'reverse'
					: object.props.args.alternate
						? 'alternate'
						: 'normal';
				let animation = object.props.args.x
					? 'mfm-spinX'
					: object.props.args.y
						? 'mfm-spinY'
						: 'mfm-spin';
				let speed = object.props.args.speed || '1.5s';
				let delay = object.props.args.delay || '0s';
				return `<span style="display: inline-block; animation: ${animation} ${speed} linear infinite; animation-delay: ${delay}; animation-direction: ${direction};">${renderEachChild(object.children, scale)}</span>`;
			} else if (object.props.name === 'jump') {
				let speed = object.props.args.speed || '1s';
				let delay = object.props.args.delay || '0s';
				return `<span style="display: inline-block; animation: mfm-jump ${speed} linear infinite; animation-delay: ${delay};">${renderEachChild(object.children, scale)}</span>`;
			} else if (object.props.name === 'bounce') {
				let speed = object.props.args.speed || '1s';
				let delay = object.props.args.delay || '0s';
				return `<span style="display: inline-block; animation: mfm-bounce ${speed} linear infinite; animation-delay: ${delay};">${renderEachChild(object.children, scale)}</span>`;
			} else if (object.props.name === 'flip') {
				let transform =
					object.props.args.h && object.props.args.v
						? 'scale(-1,-1)'
						: object.props.args.v
							? 'scaleY(-1)'
							: 'scaleX(-1)';
				return `<span style="display: inline-block; transform: ${transform}">${renderEachChild(object.children, scale)}</span>`;
			} else if (object.props.name === 'x2') {
				scale = scale * 2;
				return `<span class="mfm-x2" style="display: inline-block;">${renderEachChild(object.children, scale)}</span>`;
			} else if (object.props.name === 'x3') {
				scale = scale * 3;
				return `<span class="mfm-x3" style="display: inline-block;">${renderEachChild(object.children, scale)}</span>`;
			} else if (object.props.name === 'x4') {
				scale = scale * 4;
				return `<span class="mfm-x4" style="display: inline-block;">${renderEachChild(object.children, scale)}</span>`;
			} else if (object.props.name === 'font') {
				let font = object.props.args.serif
					? 'serif'
					: object.props.args.monospace
						? 'monospace'
						: object.props.args.system
							? 'system-ui'
							: object.props.args.sans
								? 'sans'
								: object.props.args.mono
									? 'monospace'
									: object.props.args.cursive
										? 'cursive'
										: object.props.args.fantasy
											? 'fantasy'
											: object.props.args.emoji
												? 'emoji'
												: object.props.args.math
													? 'math'
													: null;
				return `<span style="display: inline-block; font-family: ${font};">${renderEachChild(object.children, scale)}</span>`;
			} else if (object.props.name === 'blur') {
				return `<span class="mfm-blur" style="display: inline-block;">${renderEachChild(object.children, scale)}</span>`;
			} else if (object.props.name === 'rainbow') {
				let speed = object.props.args.speed || '1s';
				let delay = object.props.args.delay || '0s';
				return `<span style="display: inline-block; animation: mfm-rainbow ${speed} linear infinite; animation-delay: ${delay};">${renderEachChild(object.children, scale)}</span>`;
			} else if (object.props.name === 'sparkle') {
				// deal with this later
				return renderEachChild(object.children, scale);
			} else if (object.props.name === 'rotate') {
				let degrees = object.props.args.deg || '90';
				return `<span style="display: inline-block; transform: rotate(${degrees}deg); transform-origin: center center;">${renderEachChild(object.children, scale)}</span>`;
			} else if (object.props.name === 'position') {
				let x = object.props.args.x || 0;
				let y = object.props.args.y || 0;
				return `<span style="display: inline-block; transform: translateX(${x}em) translateY(${y}em);">${renderEachChild(object.children, scale)}</span>`;
			} else if (object.props.name === 'scale') {
				let x = Math.min(object.props.args.x) || 1;
				let y = Math.min(object.props.args.y) || 1;
				scale = scale * Math.max(x, y);
				return `<span style="display: inline-block; transform: scale(${x}, ${y});">${renderEachChild(object.children, scale)}</span>`;
			} else if (object.props.name === 'fg') {
				let color = object.props.args.color || 'f00';
				return `<span style="display: inline-block; color: #${color};">${renderEachChild(object.children, scale)}</span>`;
			} else if (object.props.name === 'bg') {
				let color = object.props.args.color || 'f00';
				return `<span style="display: inline-block; background-color: #${color};">${renderEachChild(object.children, scale)}</span>`;
			} else if (object.props.name === 'border') {
				let color = object.props.args.color || 'var(--accent)';
				let style = object.props.args.style || 'solid';
				let width = object.props.args.width || 1;
				let radius = object.props.args.radius || 0;
				let noclip = object.props.args.noclip ? '' : ' ovrflow: clip;';
				return `<span style="display: inline-block; border: ${width}px ${style} ${color}; border-raidus: ${radius};${noclip}">${renderEachChild(object.children, scale)}</span>`;
			} else if (object.props.name === 'plain') {
				return `<span style="display: inline-block;">${renderEachChild(object.children, scale)}</span>`;
			} else if (object.props.name === 'small') {
				return `<small style="opacity: 75%;">${renderEachChild(object.children, scale)}</small>`;
			} else if (object.props.name === 'center') {
				return `<span style="text-align: center;">${renderEachChild(object.children, scale)}</span>`;
			} else {
				// if the element is unknown
				return `<span style="display: inline-block;">${renderEachChild(object.children, scale)}</span>`;
			}
		} else {
			// if the element is unknown
			return `<span style="display: inline-block;">${renderEachChild(object.children, scale)}</span>`;
		}
	}

	console.log(mfmTree);
</script>

<span class="mfmCtn">
	{#each mfmTree as object}
		{@html renderMfm(object)}
	{/each}
</span>

<style lang="scss">
	.mfmCtn {
		display: block;
		overflow-wrap: break-word;
		position: relative;
		white-space: preserve;
	}

	.mfm-quote {
		margin: 4px 12px;
		color: var(--txt-tertiary);
		padding-left: 8px;
		border-left: 2px solid var(--txt-tertiary);
	}

	.mfm-rainbow {
		background-image: linear-gradient(
			to right,
			rgb(255, 0, 0) 0%,
			rgb(255, 165, 0) 17%,
			rgb(255, 255, 0) 33%,
			rgb(0, 255, 0) 50%,
			rgb(0, 255, 255) 67%,
			rgb(0, 0, 255) 83%,
			rgb(255, 0, 255) 100%
		);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}

	@keyframes mfm-spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes mfm-tada {
		from {
			transform: scale3d(1, 1, 1);
		}

		10%,
		20% {
			transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
		}

		30%,
		50%,
		70%,
		90% {
			transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
		}

		40%,
		60%,
		80% {
			transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
		}

		to {
			transform: scale3d(1, 1, 1);
		}
	}

	@keyframes mfm-jump {
		0% {
			transform: translateY(0);
		}
		25% {
			transform: translateY(-16px);
		}
		50% {
			transform: translateY(0);
		}
		75% {
			transform: translateY(-8px);
		}
		100% {
			transform: translateY(0);
		}
	}

	@keyframes mfm-bounce {
		0% {
			transform: translateY(0) scale(1, 1);
		}
		25% {
			transform: translateY(-16px) scale(1, 1);
		}
		50% {
			transform: translateY(0) scale(1, 1);
		}
		75% {
			transform: translateY(0) scale(1.5, 0.75);
		}
		100% {
			transform: translateY(0) scale(1, 1);
		}
	}

	@keyframes mfm-twitch {
		0% {
			transform: translate(7px, -2px);
		}
		5% {
			transform: translate(-3px, 1px);
		}
		10% {
			transform: translate(-7px, -1px);
		}
		15% {
			transform: translate(0px, -1px);
		}
		20% {
			transform: translate(-8px, 6px);
		}
		25% {
			transform: translate(-4px, -3px);
		}
		30% {
			transform: translate(-4px, -6px);
		}
		35% {
			transform: translate(-8px, -8px);
		}
		40% {
			transform: translate(4px, 6px);
		}
		45% {
			transform: translate(-3px, 1px);
		}
		50% {
			transform: translate(2px, -10px);
		}
		55% {
			transform: translate(-7px, 0px);
		}
		60% {
			transform: translate(-2px, 4px);
		}
		65% {
			transform: translate(3px, -8px);
		}
		70% {
			transform: translate(6px, 7px);
		}
		75% {
			transform: translate(-7px, -2px);
		}
		80% {
			transform: translate(-7px, -8px);
		}
		85% {
			transform: translate(9px, 3px);
		}
		90% {
			transform: translate(-3px, -2px);
		}
		95% {
			transform: translate(-10px, 2px);
		}
		100% {
			transform: translate(-2px, -6px);
		}
	}

	@keyframes mfm-shake {
		0% {
			transform: translate(-3px, -1px) rotate(-8deg);
		}
		5% {
			transform: translate(0px, -1px) rotate(-10deg);
		}
		10% {
			transform: translate(1px, -3px) rotate(0deg);
		}
		15% {
			transform: translate(1px, 1px) rotate(11deg);
		}
		20% {
			transform: translate(-2px, 1px) rotate(1deg);
		}
		25% {
			transform: translate(-1px, -2px) rotate(-2deg);
		}
		30% {
			transform: translate(-1px, 2px) rotate(-3deg);
		}
		35% {
			transform: translate(2px, 1px) rotate(6deg);
		}
		40% {
			transform: translate(-2px, -3px) rotate(-9deg);
		}
		45% {
			transform: translate(0px, -1px) rotate(-12deg);
		}
		50% {
			transform: translate(1px, 2px) rotate(10deg);
		}
		55% {
			transform: translate(0px, -3px) rotate(8deg);
		}
		60% {
			transform: translate(1px, -1px) rotate(8deg);
		}
		65% {
			transform: translate(0px, -1px) rotate(-7deg);
		}
		70% {
			transform: translate(-1px, -3px) rotate(6deg);
		}
		75% {
			transform: translate(0px, -2px) rotate(4deg);
		}
		80% {
			transform: translate(-2px, -1px) rotate(3deg);
		}
		85% {
			transform: translate(1px, -3px) rotate(-10deg);
		}
		90% {
			transform: translate(1px, 0px) rotate(3deg);
		}
		95% {
			transform: translate(-2px, 0px) rotate(-3deg);
		}
		100% {
			transform: translate(2px, 1px) rotate(2deg);
		}
	}
</style>
