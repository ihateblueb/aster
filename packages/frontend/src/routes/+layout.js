import getUser from '$lib/api/user/get';
import store from '$lib/store';
import localstore from '$lib/localstore';
import getEmojis from '$lib/api/emojis/get';
import { browser } from '$app/environment';

export const prerender = false;
export const ssr = false;

async function updateTheme() {
	let colorScheme = localstore.getParsed('colorScheme');
	let themeName =
		colorScheme === 'light'
			? localstore.getParsed('themeLight')
			: localstore.getParsed('themeDark');

	let style = '';
	let theme = await import('$lib/themes/' + themeName).catch(async () => {
		return await import(
			'$lib/themes/' +
				(colorScheme === 'light'
					? localstore.defaults.themeLight.value
					: localstore.defaults.themeDark.value)
		);
	});
	let keys = Object.keys(theme);

	function createColorOpacities(key) {
		style += `--${key}:${theme[key]};`;
		style += `--${key}-10:${theme[key]}10;`;
		style += `--${key}-25:${theme[key]}25;`;
		style += `--${key}-50:${theme[key]}50;`;
		style += `--${key}-75:${theme[key]}75;`;
		style += `--${key}-99:${theme[key]}99;`;
	}

	for (const key of keys) {
		if (key !== 'default') createColorOpacities(key);
	}

	document.body.setAttribute('style', style);
}

function updateSelf() {
	let self = localstore.getParsed('self');

	if (self) {
		getUser(self.id)
			.then((self) => {
				localstore.set('self', JSON.stringify(self));
			})
			.catch((err) => {
				console.log('failed to fetch new self');
				console.error(err);
			});
	}
}

function updateEmojis() {
	getEmojis()
		.then((emojis) => {
			localstore.set('emojis', JSON.stringify(emojis));
		})
		.catch((err) => {
			console.log('failed to fetch new emojis');
			console.error(err);
		});
}

if (browser) {
	window
		.matchMedia('(prefers-color-scheme: dark)')
		.addEventListener('change', (event) => {
			let colorScheme = event.matches ? 'dark' : 'light';

			if (localstore.getParsed('adjustColorSchemeToBrowser')) {
				console.log('colorScheme change detected, now ' + colorScheme);
				localstore.set('colorScheme', colorScheme);
				updateTheme();
			}
		});

	store.appReload.subscribe((e) => {
		if (e) location.reload();
	});

	store.themeRefresh.subscribe((e) => {
		if (e) {
			updateTheme();
			store.themeRefresh.set(false);
		}
	});

	updateSelf();
	updateEmojis();
}

export async function load({}) {
	await updateTheme();
}
