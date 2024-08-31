import { JSDOM } from 'jsdom';

export default async function mfmFromHtml(html: string) {
	let document = new JSDOM(html).window.document;

	// links and mentions

	document.querySelectorAll('a').forEach((e) => {
		if (
			e.getAttributeNames().includes('href') &&
			e.textContent.startsWith('@')
		) {
			let newLink = document.createElement('a');

			newLink.setAttribute('killme', 'true');
			newLink.innerHTML =
				e.textContent +
				(e.textContent.includes('@' + new URL(e.href).host)
					? ''
					: '@' + new URL(e.href).host);

			e.replaceWith(newLink);
		} else {
			let newLink = document.createElement('span');

			newLink.setAttribute('killme', 'true');
			newLink.innerHTML =
				'[' +
				(e.innerHTML
					? e.innerHTML.replace(/\\"/g, '"')
					: e.href.replace(/\\"/g, '"')) +
				']' +
				'(' +
				e.href.replace(/\\"/g, '"') +
				')';

			e.replaceWith(newLink);
		}
	});

	// general formatting

	document.querySelectorAll('h1').forEach((e) => {
		let newText = document.createElement('span');

		newText.setAttribute('killme', 'true');
		newText.innerHTML = '$[x2 **' + e.innerHTML + '**]';

		e.replaceWith(newText);
	});

	document.querySelectorAll('h2, h3').forEach((e) => {
		let newText = document.createElement('span');

		newText.setAttribute('killme', 'true');
		newText.innerHTML = '$[x2 ' + e.innerHTML + ']';

		e.replaceWith(newText);
	});

	document.querySelectorAll('b, strong').forEach((e) => {
		let newText = document.createElement('span');

		newText.setAttribute('killme', 'true');
		newText.innerHTML = '**' + e.innerHTML + '**';

		e.replaceWith(newText);
	});

	document.querySelectorAll('i, em').forEach((e) => {
		let newText = document.createElement('span');

		newText.setAttribute('killme', 'true');
		newText.innerHTML = '*' + e.innerHTML + '*';

		e.replaceWith(newText);
	});

	document.querySelectorAll('small').forEach((e) => {
		let newText = document.createElement('span');

		newText.setAttribute('killme', 'true');
		newText.innerHTML = '$[small ' + e.innerHTML + ']';

		e.replaceWith(newText);
	});

	document.querySelectorAll('s, del').forEach((e) => {
		let newText = document.createElement('span');

		newText.setAttribute('killme', 'true');
		newText.innerHTML = '~~' + e.innerHTML + '~~';

		e.replaceWith(newText);
	});

	document.querySelectorAll('pre').forEach((e) => {
		let newText = document.createElement('span');

		newText.setAttribute('killme', 'true');
		newText.innerHTML = '\n```\n' + e.innerHTML + '\n```\n';

		e.replaceWith(newText);
	});

	document.querySelectorAll('code').forEach((e) => {
		let newText = document.createElement('span');

		newText.setAttribute('killme', 'true');
		newText.innerHTML = '`' + e.innerHTML + '`';

		e.replaceWith(newText);
	});

	document.querySelectorAll('blockquote').forEach((e) => {
		let newText = document.createElement('span');

		newText.setAttribute('killme', 'true');
		newText.innerHTML = '\n> ' + e.innerHTML;

		e.replaceWith(newText);
	});

	document.querySelectorAll('p, h4, h5, h6').forEach((e) => {
		let newText = document.createElement('span');

		newText.setAttribute('killme', 'true');
		newText.innerHTML = e.innerHTML + '\n';

		e.replaceWith(newText);
	});

	document
		.querySelectorAll('div, header, footer, article, dt, dd')
		.forEach((e) => {
			let newText = document.createElement('span');

			newText.setAttribute('killme', 'true');
			newText.innerHTML = e.innerHTML + '\n';

			e.replaceWith(newText);
		});

	document.querySelectorAll('li').forEach((e) => {
		let newText = document.createElement('span');

		newText.setAttribute('killme', 'true');
		newText.innerHTML = '\n-' + e.innerHTML;

		e.replaceWith(newText);
	});

	document.querySelectorAll('br').forEach((e) => {
		let newText = document.createElement('span');

		newText.setAttribute('killme', 'true');
		newText.innerHTML = '\n';

		e.replaceWith(newText);
	});

	// misc

	document.querySelectorAll('.h-card').forEach((e) => {
		e.replaceWith(...e.childNodes);
	});

	// KILL ME

	document.querySelectorAll('[killme=true]').forEach((e) => {
		e.replaceWith(...e.childNodes);
	});

	return document.body.innerHTML;
}
