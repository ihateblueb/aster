/*
    Converts MFM tree from mfm.js to HTML usable with Aster's MFM styling.
*/

function renderEachChild(objChild, scale) {
	let collectedChildren = '';
	objChild.forEach((child) => {
		collectedChildren = collectedChildren + render(child, scale);
	});
	return collectedChildren;
}

export default function render(object, scale) {
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
			return `<span style="display: inline-block; animation: mfm-jelly ${speed} linear infinite; animation-delay: ${delay};">${renderEachChild(object.children, scale)}</span>`;
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
			return `<span class="mfm-rainbow" style="display: inline-block; animation: mfm-rainbow ${speed} linear infinite; animation-delay: ${delay};">${renderEachChild(object.children, scale)}</span>`;
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
