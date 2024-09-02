import { getLocaleFile } from '$lib/locale';

import localstore from '$lib/utils/localstore';
import store from '$lib/utils/store';

export const ssr = false;

export async function load({ url }) {
	// get meta
	const response = await fetch(`/api/v2/meta`);
	const data = await response.json();

	// locale stuff
	let grabbedLocale = localstore.get('locale');
	let grabbedNewLocale = await getLocaleFile(localstore.get('lang'));
	if (grabbedLocale) {
		if (
			grabbedNewLocale.__version__ > JSON.parse(grabbedLocale).__version__
		) {
			localstore.set('locale', JSON.stringify(grabbedNewLocale));
			console.log(
				`[locale] ${grabbedNewLocale.__name__} (${grabbedNewLocale.__id__}) v${JSON.parse(grabbedLocale).__version__} was updated to v${grabbedNewLocale.__version__}`
			);
		} else {
			console.log(
				`[locale] ${JSON.parse(grabbedLocale).__name__} (${JSON.parse(grabbedLocale).__id__}) v${JSON.parse(grabbedLocale).__version__} was previously installed`
			);
		}
	} else {
		if (grabbedNewLocale) {
			localstore.set('locale', JSON.stringify(grabbedNewLocale));
			console.log(
				`[locale] ${grabbedNewLocale.__name__} (${grabbedNewLocale.__id__}) v${grabbedNewLocale.__version__} was installed`
			);
		} else {
			console.log(`[locale] there was a problem installing the locale`);
		}
	}

	document.body.classList.add('theme-' + localstore.get('theme'));
	document.body.classList.add('font-' + localstore.get('font'));

	store.theme.set(localstore.get('theme'));
	store.font.set(localstore.get('font'));

	store.theme.subscribe(async (value) => {
		let link = document.createElement('link');
		link.setAttribute('rel', 'stylesheet');

		link.onload = () => {
			document.body.classList.replace(
				'theme-' + localstore.get('theme'),
				'theme-' + value
			);
			localstore.set('theme', value);
		};

		link.setAttribute('href', '/themes/' + value + '.scss');
		document.getElementsByTagName('head')[0].appendChild(link);
	});
	store.font.subscribe(async (value) => {
		let link = document.createElement('link');
		link.setAttribute('rel', 'stylesheet');

		link.onload = () => {
			document.body.classList.replace(
				'font-' + localstore.get('font'),
				'font-' + value
			);
			localstore.set('font', value);
		};

		link.setAttribute('href', '/fonts/' + value + '.scss');
		document.getElementsByTagName('head')[0].appendChild(link);
	});

	// update account
	let account = localstore.get('account');
	if (account && JSON.parse(account).id) {
		let accountReq = await fetch(`/api/v2/user/${JSON.parse(account).id}`);
		let accountRes = await accountReq.json();

		if (accountReq.status === 200) {
			localstore.set('account', JSON.stringify(accountRes));
		}
	}

	// websocket
	/*
	let socket = io('/');

	socket.send(
		'hi. my name is ' +
			(localstore.get('account')
				? JSON.parse(localstore.get('account')).username
				: 'unknown')
	);
	*/

	// return meta
	return data;
}
