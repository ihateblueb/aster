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
        elements working:
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

		elements todo:
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
		- sparkle
		- position
		- scale
		- additional options (speed, x/y, alternate, etc.)

        known issues:
        they dont stack.
    */

	function basicRender(object) {
		if (object.type === 'text') {
			return `<span>${object.props.text}</span>`;
		} else if (object.type === 'url') {
			return `<a href="${object.props.url}">${object.props.url}</a>`;
		} else if (object.type === 'inlineCode') {
			return `<code>` + object.props.code + `</code>`;
		} else if (object.type === 'bold') {
			let collectedOutput = '';
			object.children.forEach((child) => {
				collectedOutput = collectedOutput + basicRender(child);
			});
			return `<strong>` + collectedOutput + `</strong>`;
		} else if (object.type === 'italic') {
			let collectedOutput = '';
			object.children.forEach((child) => {
				collectedOutput = collectedOutput + basicRender(child);
			});
			return `<i>` + collectedOutput + `</i>`;
		} else if (object.type === 'strike') {
			let collectedOutput = '';
			object.children.forEach((child) => {
				collectedOutput = collectedOutput + basicRender(child);
			});
			return `<s>` + collectedOutput + `</s>`;
		} else if (object.type === 'quote') {
			let collectedOutput = '';
			object.children.forEach((child) => {
				collectedOutput = collectedOutput + basicRender(child);
			});
			return `<blockquote>` + collectedOutput + `</blockquote>`;
		} else if (object.type === 'small') {
			let collectedOutput = '';
			object.children.forEach((child) => {
				collectedOutput = collectedOutput + basicRender(child);
			});
			return `<small class="mfm-small">` + collectedOutput + `</small>`;
		} else if (object.type === 'center') {
			let collectedOutput = '';
			object.children.forEach((child) => {
				collectedOutput = collectedOutput + basicRender(child);
			});
			return `<span class="mfm-center">` + collectedOutput + `</span>`;
		} else if (object.type === 'plain') {
			let collectedOutput = '';
			object.children.forEach((child) => {
				collectedOutput = collectedOutput + basicRender(child);
			});
			return `<span class="mfm-plain">` + collectedOutput + `</span>`;
		} else if (object.type === 'fn') {
			if (object.props.name === 'spin') {
				let collectedOutput = '';
				object.children.forEach((child) => {
					collectedOutput = collectedOutput + basicRender(child);
				});
				return `<span class="mfm-spin">` + collectedOutput + `</span>`;
			} else if (object.props.name === 'tada') {
				let collectedOutput = '';
				object.children.forEach((child) => {
					collectedOutput = collectedOutput + basicRender(child);
				});
				return `<span class="mfm-tada">` + collectedOutput + `</span>`;
			} else if (object.props.name === 'jump') {
				let collectedOutput = '';
				object.children.forEach((child) => {
					collectedOutput = collectedOutput + basicRender(child);
				});
				return `<span class="mfm-jump">` + collectedOutput + `</span>`;
			} else if (object.props.name === 'bounce') {
				let collectedOutput = '';
				object.children.forEach((child) => {
					collectedOutput = collectedOutput + basicRender(child);
				});
				return (
					`<span class="mfm-bounce">` + collectedOutput + `</span>`
				);
			} else if (object.props.name === 'twitch') {
				let collectedOutput = '';
				object.children.forEach((child) => {
					collectedOutput = collectedOutput + basicRender(child);
				});
				return (
					`<span class="mfm-twitch">` + collectedOutput + `</span>`
				);
			} else if (object.props.name === 'shake') {
				let collectedOutput = '';
				object.children.forEach((child) => {
					collectedOutput = collectedOutput + basicRender(child);
				});
				return `<span class="mfm-shake">` + collectedOutput + `</span>`;
			} else if (object.props.name === 'x2') {
				let collectedOutput = '';
				object.children.forEach((child) => {
					collectedOutput = collectedOutput + basicRender(child);
				});
				return `<span class="mfm-x2">` + collectedOutput + `</span>`;
			} else if (object.props.name === 'rainbow') {
				let collectedOutput = '';
				object.children.forEach((child) => {
					collectedOutput = collectedOutput + basicRender(child);
				});
				return (
					`<span class="mfm-rainbow">` + collectedOutput + `</span>`
				);
			} else if (object.props.name === 'x2') {
				let collectedOutput = '';
				object.children.forEach((child) => {
					collectedOutput = collectedOutput + basicRender(child);
				});
				return `<span class="mfm-x2">` + collectedOutput + `</span>`;
			} else if (object.props.name === 'x3') {
				let collectedOutput = '';
				object.children.forEach((child) => {
					collectedOutput = collectedOutput + basicRender(child);
				});
				return `<span class="mfm-x3">` + collectedOutput + `</span>`;
			} else if (object.props.name === 'x4') {
				let collectedOutput = '';
				object.children.forEach((child) => {
					collectedOutput = collectedOutput + basicRender(child);
				});
				return `<span class="mfm-x4">` + collectedOutput + `</span>`;
			} else if (object.props.name === 'small') {
				let collectedOutput = '';
				object.children.forEach((child) => {
					collectedOutput = collectedOutput + basicRender(child);
				});
				return (
					`<small class="mfm-small">` + collectedOutput + `</small>`
				);
			} else if (object.props.name === 'center') {
				let collectedOutput = '';
				object.children.forEach((child) => {
					collectedOutput = collectedOutput + basicRender(child);
				});
				return (
					`<span class="mfm-center">` + collectedOutput + `</span>`
				);
			} else if (object.props.name === 'plain') {
				let collectedOutput = '';
				object.children.forEach((child) => {
					collectedOutput = collectedOutput + basicRender(child);
				});
				return `<span class="mfm-plain">` + collectedOutput + `</span>`;
			} else if (object.props.name === 'blur') {
				let collectedOutput = '';
				object.children.forEach((child) => {
					collectedOutput = collectedOutput + basicRender(child);
				});
				return `<span class="mfm-blur">` + collectedOutput + `</span>`;
			}
		}
	}

	console.log(mfmTree);
</script>

<p class="mfmCtn">
	{#each mfmTree as object}
		{#if object.type === 'text'}
			<span>{object.props.text}</span>
		{:else if object.type === 'url'}
			<a href={object.props.url}>
				{object.props.url}
			</a>
		{:else if object.type === 'inlineCode'}
			<code>
				{object.props.code}
			</code>
		{:else if object.type === 'bold'}
			<strong>
				{#each object.children as child}
					{@html basicRender(child)}
				{/each}
			</strong>
		{:else if object.type === 'italic'}
			<i>
				{#each object.children as child}
					{@html basicRender(child)}
				{/each}
			</i>
		{:else if object.type === 'strike'}
			<strike>
				{#each object.children as child}
					{@html basicRender(child)}
				{/each}
			</strike>
		{:else if object.type === 'quote'}
			<blockquote>
				{#each object.children as child}
					{@html basicRender(child)}
				{/each}
			</blockquote>
		{:else if object.type === 'small'}
			<small class="mfm-small">
				{#each object.children as child}
					{@html basicRender(child)}
				{/each}
			</small>
		{:else if object.type === 'center'}
			<span class="mfm-center">
				{#each object.children as child}
					{@html basicRender(child)}
				{/each}
			</span>
		{:else if object.type === 'plain'}
			<span class="mfm-plain">
				{#each object.children as child}
					{@html basicRender(child)}
				{/each}
			</span>
		{:else if object.type === 'fn'}
			{#if object.props.name === 'spin'}
				<span class="mfm-spin">
					{#each object.children as child}
						{@html basicRender(child)}
					{/each}
				</span>
			{:else if object.props.name === 'tada'}
				<span class="mfm-tada">
					{#each object.children as child}
						{@html basicRender(child)}
					{/each}
				</span>
			{:else if object.props.name === 'jump'}
				<span class="mfm-jump">
					{#each object.children as child}
						{@html basicRender(child)}
					{/each}
				</span>
			{:else if object.props.name === 'bounce'}
				<span class="mfm-bounce">
					{#each object.children as child}
						{@html basicRender(child)}
					{/each}
				</span>
			{:else if object.props.name === 'twitch'}
				<span class="mfm-twitch">
					{#each object.children as child}
						{@html basicRender(child)}
					{/each}
				</span>
			{:else if object.props.name === 'shake'}
				<span class="mfm-shake">
					{#each object.children as child}
						{@html basicRender(child)}
					{/each}
				</span>
			{:else if object.props.name === 'rainbow'}
				<span class="mfm-rainbow">
					{#each object.children as child}
						{@html basicRender(child)}
					{/each}
				</span>
			{:else if object.props.name === 'x2'}
				<span class="mfm-x2">
					{#each object.children as child}
						{@html basicRender(child)}
					{/each}
				</span>
			{:else if object.props.name === 'x3'}
				<span class="mfm-x3">
					{#each object.children as child}
						{@html basicRender(child)}
					{/each}
				</span>
			{:else if object.props.name === 'x4'}
				<span class="mfm-x4">
					{#each object.children as child}
						{@html basicRender(child)}
					{/each}
				</span>
			{:else if object.props.name === 'small'}
				<small class="mfm-small">
					{#each object.children as child}
						{@html basicRender(child)}
					{/each}
				</small>
			{:else if object.props.name === 'center'}
				<span class="mfm-center">
					{#each object.children as child}
						{@html basicRender(child)}
					{/each}
				</span>
			{:else if object.props.name === 'plain'}
				<span class="mfm-plain">
					{#each object.children as child}
						{@html basicRender(child)}
					{/each}
				</span>
			{:else if object.props.name === 'blur'}
				<span class="mfm-blur">
					{#each object.children as child}
						{@html basicRender(child)}
					{/each}
				</span>
			{/if}
		{/if}
	{/each}
</p>
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

		> * {
			white-space: pre-wrap;
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
		display: block;
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
