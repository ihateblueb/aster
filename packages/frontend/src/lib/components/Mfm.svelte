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
        elements todo:
        - text
		- url
        - bold
        - italic
        - strikethrough
        - quote
		- plain
		- center
		- small
        - fn spin
        - fn tada
        - fn jump
        - fn bounce
        - fn twitch
        - fn shake
        - fn rainbow
        - fn x2
        - fn x3
        - fn x4
		- fn plain
		- fn center
		- fn small
		- fn blur

		- hashtag
		- mention
		- math
		- inline math
		- code
		- inline code
		- emoji
		- search
		- flip
		- fg
		- bg
		- font
		- rotate
		- jelly
		- sparkle
		- position
		- scale
		- additional options (speed, x/y, alternate, etc.)

        known issues:
        they dont stack.
    */

	function renderEachChild(objChild) {
		let collectedChildren = '';
		objChild.forEach((child) => {
			collectedChildren = collectedChildren + renderMfm(child);
		});
		return collectedChildren;
	}

	function renderMfm(object) {
		if (object.type === 'text') {
			return object.props.text.replace(/(\r\n|\n|\r)/g, '\n');
		} else if (object.type === 'bold') {
			return `<b>${renderEachChild(object.children)}</b>`;
		} else if (object.type === 'strike') {
			return `<s>${renderEachChild(object.children)}</ss>`;
		} else if (object.type === 'italic') {
			return `<i>${renderEachChild(object.children)}</i>`;
		} else if (object.type === 'fn') {
			if (object.props.name === 'tada') {
				let speed = object.props.args.speed || '1s';
				let delay = object.props.args.delay || '0s';
				return `<span style="font-size: 150%; animation: ${speed} linear ${delay} infinite normal both running mfm-tada;">${renderEachChild(object.children)}</span>`;
			}
		}
	}

	console.log(mfmTree);
</script>

<span class="mfmCtn">
	{#each mfmTree as object}
		{@html renderMfm(object)}
	{/each}
</span>
<br />
<p>
	Raw MFM Tree:
	<code>{JSON.stringify(mfmTree)}</code>
</p>

<style lang="scss">
	/* animations taken from misskey's style.scss */

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

	.mfmCtn {
		display: block;
		overflow-wrap: break-word;
		position: relative;
		white-space: preserve;

		> * {
			white-space: preserve;
		}
	}

	.mfm-blur {
		filter: blur(6px);
		transition: 0.1s;
		&:hover {
			filter: blur(0px);
		}
	}

	.mfm-small {
		color: var(--txt-tertiary);
	}

	.mfm-center {
		display: block;
		width: 100%;
		text-align: center;
	}

	.mfm-plain {
		display: inline-block;
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

	.mfm-jump {
		display: inline-block;
		animation: 1s linear 0s infinite normal both running mfm-jump;
	}

	.mfm-bounce {
		display: inline-block;
		animation: 1s linear 0s infinite normal both running mfm-bounce;
	}

	.mfm-twitch {
		display: inline-block;
		animation: 1s linear 0s infinite normal both running mfm-twitch;
	}

	.mfm-shake {
		display: inline-block;
		animation: 1s linear 0s infinite normal both running mfm-shake;
	}

	.mfm-tada {
		display: inline-block;
		font-size: 150%;
		animation: 1s linear 0s infinite normal both running mfm-tada;
	}

	.mfm-spin {
		display: inline-block;
		animation: 1s linear 0s infinite normal none running mfm-spin;
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

	blockquote {
		margin: 4px 12px;
		color: var(--txt-tertiary);
		padding-left: 8px;
		border-left: 2px solid var(--txt-tertiary);
	}
</style>
