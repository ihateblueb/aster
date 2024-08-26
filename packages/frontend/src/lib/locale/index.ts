import localstore from '$lib/utils/localstore';

export async function getLocaleFile(locale) {
	if (locale) {
		return await import(`./${locale}.json`);
	} else {
		return await import(`./en_US.json`);
	}
}

export function locale(string) {
	if (string) {
		let fetchedLocale = localstore.get('locale');
		if (fetchedLocale) {
			let matchedLocale = JSON.parse(fetchedLocale)[string];
			if (matchedLocale) {
				return matchedLocale;
			} else {
				return string;
			}
		}
	} else {
		return;
	}
}
