import { getLocaleFile } from '$lib/locale';

import Store from '$lib/utils/Store';
import { io } from 'socket.io-client';

export const ssr = false;

export async function load({ url }) {
	// get meta
	const response = await fetch(`/api/v2/meta`);
	const data = await response.json();

	// locale stuff
	let grabbedLocale = Store.get('locale');
	let grabbedNewLocale = await getLocaleFile(Store.get('lang'));
	if (grabbedLocale) {
		if (
			grabbedNewLocale.__version__ > JSON.parse(grabbedLocale).__version__
		) {
			Store.set('locale', JSON.stringify(grabbedNewLocale));
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
			Store.set('locale', JSON.stringify(grabbedNewLocale));
			console.log(
				`[locale] ${grabbedNewLocale.__name__} (${grabbedNewLocale.__id__}) v${grabbedNewLocale.__version__} was installed`
			);
		} else {
			console.log(`[locale] there was a problem installing the locale`);
		}
	}

	document.body.classList.add('theme-' + Store.get('theme'));

	document.body.classList.add('font-' + Store.get('font'));

	// update account
	let account = Store.get('account');
	if (account && JSON.parse(account).id) {
		let accountReq = await fetch(`/api/v2/user/${JSON.parse(account).id}`);
		let accountRes = await accountReq.json();

		if (accountReq.status === 200) {
			Store.set('account', JSON.stringify(accountRes));
		}
	}

	// websocket
	/*
	let socket = io('/');

	socket.send(
		'hi. my name is ' +
			(Store.get('account')
				? JSON.parse(Store.get('account')).username
				: 'unknown')
	);
	*/

	// return meta
	return data;
}
