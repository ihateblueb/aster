export default function unsharkLikes(body) {
	console.log('hiiii from unsharkLikes.ts');

	const sharkeyLikes = [
		'neocat_heart',
		'neofox_heart',
		'pride_heart',
		'ms_star',
		'❤',
		'♥️',
		'❤️',
		'🧡',
		'💛',
		'💚',
		'💙',
		'🩵',
		'💜',
		'🤎',
		'🖤',
		'🩶',
		'🤍',
		'⭐'
	];

	if (sharkeyLikes.includes(body._misskey_content)) {
		body._misskey_content = '';
		console.log('like unsharked');
	} else {
		console.log('like not unsharked');
	}

	return body;
}
