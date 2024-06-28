<script>
	import * as mfm from 'mfm-js';
	import Sparkle from './Sparkle.svelte';

	export let content;
	export let simple = false;

	let mfmTree = [];

	if (simple) {
		mfmTree = mfm.parseSimple(content);
	} else {
		mfmTree = mfm.parse(content);
	}

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
			return `<span style="display: block; text-align: center;">${renderEachChild(object.children, scale)}</span>`;
		} else if (object.type === 'url') {
			return `<a href="${object.props.url}" rel="nofollow noopener">${object.props.url}</a>`;
		} else if (object.type === 'link') {
			return `<a href="${object.props.url}" rel="nofollow noopener" title="${object.props.url}">${renderEachChild(object.children, scale)}</a>`;
		} else if (object.type === 'quote') {
			return `<blockquote class="mfm-quote">${renderEachChild(object.children, scale)}</blockquote>`;
		} else if (object.type === 'emojiCode') {
			return `<span class="mfm-emoji">:${object.props.name}:</span>`;
		} else if (object.type === 'unicodeEmoji') {
			return `<span class="mfm-emoji">${object.props.emoji}</span>`;
		} else if (object.type === 'mention') {
			return `<a class="mfm-mention" href='/${object.props.acct}'>${object.props.acct}</a>`;
		} else if (object.type === 'hashtag') {
			return `<a class="mfm-hashtag" href='/tag/${object.props.hashtag}'>#${object.props.hashtag}</a>`;
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
				return `sparkle`;
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
				return `<span style="display: block; text-align: center;">${renderEachChild(object.children, scale)}</span>`;
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

<template>
	<span class="mfmCtn">
		{#each mfmTree as object}
			{@html render(object)}
		{/each}
	</span>
</template>
