<script>
	import * as mfm from 'mfm-js';
	import twemoji from '@discordapp/twemoji';

	export let content;
	export let emojis = [];
	export let simple = false;
	export let tabindex = -1;

	let mfmTree = [];

	if (simple) {
		mfmTree = mfm.parseSimple(content);
	} else {
		mfmTree = mfm.parse(content);
	}

	console.log(emojis);

	function renderEachChild(objChild, scale) {
		let collectedChildren = '';
		objChild.forEach((child) => {
			collectedChildren = collectedChildren + render(child, scale);
		});
		return collectedChildren;
	}

	function render(object, scale) {
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
			return `<div style="text-align: center;">${renderEachChild(object.children, scale)}</div>`;
		} else if (object.type === 'url') {
			return `<a href="${object.props.url}" rel="nofollow noopener">${object.props.url}</a>`;
		} else if (object.type === 'link') {
			return `<a href="${object.props.url}" rel="nofollow noopener" title="${object.props.url}">${renderEachChild(object.children, scale)}</a>`;
		} else if (object.type === 'quote') {
			return `<blockquote class="mfm-quote">${renderEachChild(object.children, scale)}</blockquote>`;
		} else if (object.type === 'emojiCode') {
			if (emojis && emojis.length > 0) {
				let foundEmoji = emojis.find(
					(e) => e.name === ':' + object.props.name + ':'
				);
				if (foundEmoji) {
					return `<img class="mfm-customEmoji" src="${foundEmoji.url}" title=":${foundEmoji.name.replaceAll(':', '') + '@' + foundEmoji.host}:" />`;
				} else {
					return `:${object.props.name}:`;
				}
			} else {
				return `<span class="mfm-customEmoji">:${object.props.name}:</span>`;
			}
		} else if (object.type === 'unicodeEmoji') {
			return `${object.props.emoji}`;
		} else if (object.type === 'mention') {
			return `<a class="mfm-mention" href='/${object.props.acct}'>${object.props.acct}</a>`;
		} else if (object.type === 'hashtag') {
			return `${object.props.hashtag}`;
		} else if (object.type === 'inlineCode') {
			return `<code class="mfm-inlineCode">${object.props.code}</code>`;
		} else if (object.type === 'blockCode') {
			return `<div class="mfm-blockCode">${object.props.code}</div>`;
		} else if (object.type === 'fn') {
			if (object.props.name === 'tada') {
				let speed = '1s';
				let delay = '0s';
				let loop = 'infinite';
				if (object.props.args.speed) {
					speed = object.props.args.speed;
				}
				if (object.props.args.delay) {
					delay = object.props.args.delay;
				}
				if (object.props.args.loop) {
					loop = object.props.args.loop;
				}
				return `<span style="display: inline-block; animation: mfm-tada ${speed} linear ${loop}; animation-delay: ${delay}; font-size: 150%;">${renderEachChild(object.children, scale)}</span>`;
			} else if (object.props.name === 'jelly') {
				let speed = '1s';
				let delay = '0s';
				let loop = 'infinite';
				if (object.props.args.speed) {
					speed = object.props.args.speed;
				}
				if (object.props.args.delay) {
					delay = object.props.args.delay;
				}
				if (object.props.args.loop) {
					loop = object.props.args.loop;
				}
				return `<span style="display: inline-block; animation: mfm-jelly ${speed} linear ${loop}; animation-delay: ${delay};">${renderEachChild(object.children, scale)}</span>`;
			} else if (object.props.name === 'twitch') {
				let speed = '1s';
				let delay = '0s';
				let loop = 'infinite';
				if (object.props.args.speed) {
					speed = object.props.args.speed;
				}
				if (object.props.args.delay) {
					delay = object.props.args.delay;
				}
				if (object.props.args.loop) {
					loop = object.props.args.loop;
				}
				return `<span style="display: inline-block; animation: mfm-twitch ${speed} linear ${loop}; animation-delay: ${delay};">${renderEachChild(object.children, scale)}</span>`;
			} else if (object.props.name === 'shake') {
				let speed = '1s';
				let delay = '0s';
				let loop = 'infinite';
				if (object.props.args.speed) {
					speed = object.props.args.speed;
				}
				if (object.props.args.delay) {
					delay = object.props.args.delay;
				}
				if (object.props.args.loop) {
					loop = object.props.args.loop;
				}
				return `<span style="display: inline-block; animation: mfm-shake ${speed} linear ${loop}; animation-delay: ${delay};">${renderEachChild(object.children, scale)}</span>`;
			} else if (object.props.name === 'spin') {
				let direction = 'normal';
				if (object.props.args.left) {
					direction = 'reverse';
				}
				if (object.props.args.alternate) {
					direction = 'alternate';
				}
				let animation = 'mfm-spin';
				if (object.props.args.x) {
					direction = 'mfm-spinX';
				}
				if (object.props.args.y) {
					direction = 'mfm-spinY';
				}
				let speed = '1s';
				let delay = '0s';
				let loop = 'infinite';
				if (object.props.args.speed) {
					speed = object.props.args.speed;
				}
				if (object.props.args.delay) {
					delay = object.props.args.delay;
				}
				if (object.props.args.loop) {
					loop = object.props.args.loop;
				}
				return `<span style="display: inline-block; animation: ${animation} ${speed} linear ${loop}; animation-delay: ${delay}; animation-direction: ${direction};">${renderEachChild(object.children, scale)}</span>`;
			} else if (object.props.name === 'jump') {
				let speed = '1s';
				let delay = '0s';
				let loop = 'infinite';
				if (object.props.args.speed) {
					speed = object.props.args.speed;
				}
				if (object.props.args.delay) {
					delay = object.props.args.delay;
				}
				if (object.props.args.loop) {
					loop = object.props.args.loop;
				}
				return `<span style="display: inline-block; animation: mfm-jump ${speed} linear ${loop}; animation-delay: ${delay};">${renderEachChild(object.children, scale)}</span>`;
			} else if (object.props.name === 'bounce') {
				let speed = '1s';
				let delay = '0s';
				let loop = 'infinite';
				if (object.props.args.speed) {
					speed = object.props.args.speed;
				}
				if (object.props.args.delay) {
					delay = object.props.args.delay;
				}
				if (object.props.args.loop) {
					loop = object.props.args.loop;
				}
				return `<span style="display: inline-block; animation: mfm-bounce ${speed} linear ${loop}; animation-delay: ${delay};">${renderEachChild(object.children, scale)}</span>`;
			} else if (object.props.name === 'fade') {
				let speed = '1s';
				let delay = '0s';
				let loop = 'infinite';
				if (object.props.args.speed) {
					speed = object.props.args.speed;
				}
				if (object.props.args.delay) {
					delay = object.props.args.delay;
				}
				if (object.props.args.loop) {
					loop = object.props.args.loop;
				}
				return `<span style="display: inline-block; animation: mfm-fade ${speed} linear ${loop}; animation-delay: ${delay};">${renderEachChild(object.children, scale)}</span>`;
			} else if (object.props.name === 'flip') {
				let transform = 'scaleX(-1)';
				if (object.props.args.h && object.props.args.v) {
					transform = 'scaleX(-1,-1)';
				} else if (object.props.args.v) {
					transform = 'scaleX(-1)';
				}
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
				let font = 'var(--font)';
				if (object.props.args.serif) {
					font = 'serif';
				} else if (object.props.args.monospace) {
					font = 'monospace';
				} else if (object.props.args.mono) {
					font = 'monospace';
				} else if (object.props.args.system) {
					font = 'system-ui';
				} else if (object.props.args.sans) {
					font = 'sans';
				} else if (object.props.args.cursive) {
					font = 'cursive';
				} else if (object.props.args.fantasy) {
					font = 'fantasy';
				} else if (object.props.args.emoji) {
					font = 'emoji';
				} else if (object.props.args.math) {
					font = 'math';
				}
				return `<span style="display: inline-block; font-family: ${font};">${renderEachChild(object.children, scale)}</span>`;
			} else if (object.props.name === 'blur') {
				return `<span class="mfm-blur" style="display: inline-block;">${renderEachChild(object.children, scale)}</span>`;
			} else if (object.props.name === 'rainbow') {
				let speed = '1s';
				let delay = '0s';
				let loop = 'infinite';
				if (object.props.args.speed) {
					speed = object.props.args.speed;
				}
				if (object.props.args.delay) {
					delay = object.props.args.delay;
				}
				if (object.props.args.loop) {
					loop = object.props.args.loop;
				}
				return `<span style="display: inline-block; animation: mfm-rainbow ${speed} linear ${loop}; animation-delay: ${delay};">${renderEachChild(object.children, scale)}</span>`;
			} else if (object.props.name === 'sparkle') {
				// deal with this later
				return `<span style="display: inline-block;">${renderEachChild(object.children, scale)}</span>`;
			} else if (object.props.name === 'rotate') {
				let degrees = '90';
				if (object.props.args.deg) {
					degrees = object.props.args.deg;
				}
				return `<span style="display: inline-block; transform: rotate(${degrees}deg); transform-origin: center center;">${renderEachChild(object.children, scale)}</span>`;
			} else if (object.props.name === 'position') {
				let x = 0;
				let y = 0;
				if (object.props.args.x) {
					x = object.props.args.x;
				}
				if (object.props.args.y) {
					y = object.props.args.y;
				}
				return `<span style="display: inline-block; transform: translateX(${x}em) translateY(${y}em);">${renderEachChild(object.children, scale)}</span>`;
			} else if (object.props.name === 'scale') {
				let x = 1;
				let y = 1;
				if (object.props.args.x) {
					x = Math.min(object.props.args.x);
				}
				if (object.props.args.y) {
					y = Math.min(object.props.args.y);
				}
				scale = scale * Math.max(x, y);
				return `<span style="display: inline-block; transform: scale(${x}, ${y});">${renderEachChild(object.children, scale)}</span>`;
			} else if (object.props.name === 'fg') {
				let color = 'f00';
				if (object.props.args.color) {
					color = object.props.args.color;
				}
				return `<span style="display: inline-block; color: #${color};">${renderEachChild(object.children, scale)}</span>`;
			} else if (object.props.name === 'bg') {
				let color = 'f00';
				if (object.props.args.color) {
					color = object.props.args.color;
				}
				return `<span style="display: inline-block; background-color: #${color};">${renderEachChild(object.children, scale)}</span>`;
			} else if (object.props.name === 'border') {
				let color = 'var(--accent)';
				let style = 'solid';
				let width = 1;
				let radius = 0;
				let noclip = '';
				if (object.props.args.color) {
					color = object.props.args.color;
				}
				if (object.props.args.style) {
					style = object.props.args.style;
				}
				if (object.props.args.width) {
					width = object.props.args.width;
				}
				if (object.props.args.radius) {
					radius = object.props.args.radius;
				}
				if (object.props.args.noclip) {
					noclip = '';
				} else {
					noclip = ' overflow: clip;';
				}
				return `<span style="display: inline-block; border: ${width}px ${style} ${color}; border-raidus: ${radius};${noclip}">${renderEachChild(object.children, scale)}</span>`;
			} else if (object.props.name === 'plain') {
				return `<span style="display: inline-block;">${renderEachChild(object.children, scale)}</span>`;
			} else if (object.props.name === 'small') {
				return `<small style="opacity: 75%;">${renderEachChild(object.children, scale)}</small>`;
			} else if (object.props.name === 'center') {
				return `<div style="text-align: center;">${renderEachChild(object.children, scale)}</div>`;
			} else {
				// if the element is unknown
				return `<span style="display: inline-block;">${renderEachChild(object.children, scale)}</span>`;
			}
		} else {
			// if the element is unknown
			return `<span style="display: inline-block;">${renderEachChild(object.children, scale)}</span>`;
		}
	}

	function renderTree(tree) {
		let rendered = '';

		tree.forEach((e) => {
			if (e) {
				rendered += render(e);
			}
		});

		rendered = twemoji.parse(rendered, {
			base: '/assets/twemoji/',
			folder: 'svg',
			ext: '.svg',
			className: 'mfm-emoji'
		});

		return rendered;
	}

	console.log(mfmTree);
</script>

<template>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<span
		class={'mfmCtn' + (simple ? ' simple' : '')}
		dir="auto"
		{tabindex}
		on:click
		on:keypress
	>
		{#if content}
			{@html renderTree(mfmTree)}
		{:else}
			<p></p>
		{/if}
	</span>
</template>

<style lang="scss" global>
	.mfmCtn {
		display: block;
		overflow-wrap: break-word;
		position: relative;
		white-space: preserve;
		text-wrap-mode: wrap;
		white-space-collapse: preserve;
		line-height: 1.35em;

		&.simple {
			display: inline;
			line-height: normal;
		}

		> p {
			margin-bottom: 5px;
		}

		.mfm-emoji {
			display: inline;
			vertical-align: middle;
			height: 1.2em;
			transition: 0.1s;

			&:hover {
				transform: scale(1.2);
			}
		}

		.mfm-quote {
			margin: 8px 6px;
			color: var(--txt-tertiary);
			padding-left: 10px;
			border-left: var(--border-width-m) solid var(--txt-tertiary);
			opacity: 75%;
		}

		.mfm-blur {
			filter: blur(7px);
			transition: 0.1s;

			&:hover {
				filter: blur(0px);
			}
		}

		.mfm-x2 {
			font-size: 200%;
		}

		.mfm-x3 {
			font-size: 300%;
		}

		.mfm-x4 {
			font-size: 400%;
		}

		.mfm-inlineCode {
			font-size: var(--font-s);
		}

		.mfm-customEmoji {
			display: inline;
			vertical-align: middle;
			height: 2em;
			transition: 0.1s;

			&:hover {
				transform: scale(1.2);
			}
		}

		.mfm-blockCode {
			display: block;
			overflow-wrap: anywhere;
			background: var(--bg-tertiary);
			padding: 8px 12px;
			margin: 5px 0px;
			overflow: auto;
			border-radius: var(--border-m);
			font-family: monospace;
			font-size: var(--font-s);
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

		.mfm-mention {
			display: inline-flex;
			color: var(--accent);
			text-decoration: none;
			background: var(--accent-20);
			border-radius: var(--border-m);
			padding: 1px 3px;

			&:hover {
				text-decoration: underline;
			}
		}
	}

	@keyframes mfm-spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes mfm-spinX {
		0% {
			transform: perspective(128px) rotateX(0deg);
		}
		100% {
			transform: perspective(128px) rotateX(360deg);
		}
	}

	@keyframes mfm-spinY {
		0% {
			transform: perspective(128px) rotateY(0deg);
		}
		100% {
			transform: perspective(128px) rotateY(360deg);
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

	@keyframes mfm-jelly {
		from {
			transform: scale3d(1, 1, 1);
		}
		30% {
			transform: scale3d(1.25, 0.75, 1);
		}
		40% {
			transform: scale3d(0.75, 1.25, 1);
		}
		50% {
			transform: scale3d(1.15, 0.85, 1);
		}
		65% {
			transform: scale3d(0.95, 1.05, 1);
		}
		75% {
			transform: scale3d(1.05, 0.95, 1);
		}
		to {
			transform: scale3d(1, 1, 1);
		}
	}

	@keyframes mfm-rainbow {
		0% {
			filter: hue-rotate(0deg) contrast(150%) saturate(150%);
		}
		100% {
			filter: hue-rotate(360deg) contrast(150%) saturate(150%);
		}
	}

	@keyframes mfm-fade {
		0% {
			opacity: 0;
		}
		50% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
</style>
