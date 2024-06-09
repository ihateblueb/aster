export const ssr = false;

import Store from '$lib/scripts/Store';
import { getLocaleFile } from '$lib/locale';

export async function load() {
	// get meta
	const response = await fetch(`/api/v1/meta`);
	const data = await response.json();

	// locale stuff
	var grabbedLocale = Store.get('locale');
	var grabbedNewLocale = await getLocaleFile(Store.get('lang'));
	if (grabbedLocale) {
		console.log(
			`[locale] ${JSON.parse(grabbedLocale).__name__} (${JSON.parse(grabbedLocale).__id__}) v${JSON.parse(grabbedLocale).__version__} was previously installed`
		);
		if (
			grabbedNewLocale.__version__ > JSON.parse(grabbedLocale).__version__
		) {
			Store.set('locale', JSON.stringify(grabbedNewLocale));
			console.log(
				`[locale] ${grabbedNewLocale.__name__} (${grabbedNewLocale.__id__}) v${JSON.parse(grabbedLocale).__version__} was updated to v${grabbedNewLocale.__version__}`
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

	// return meta
	return data;
}
