<script>
	import { locale } from '$lib/locale';

	import PageHeader from '$lib/components/PageHeader.svelte';
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import Select from '$lib/components/Select.svelte';
	import SelectItem from '$lib/components/SelectItem.svelte';
	import localstore from '$lib/utils/localstore';
	import Toggle from '$lib/components/Toggle.svelte';

	import themes from '../../../static/themes/themes.json';

	function refreshTheme(oldTheme, newTheme) {
		store.theme.set(newTheme);
		document.body.classList.replace(
			'theme-' + oldTheme,
			'theme-' + newTheme
		);
	}

	import fonts from '../../../static/fonts/fonts.json';
	import store from '$lib/utils/store';

	function refreshFont(oldFont, newFont) {
		store.font.set(newFont);
		document.body.classList.replace('font-' + oldFont, 'font-' + newFont);
	}
</script>

<template>
	<PageHeader title={locale('settings')} icon="settings" />
	<div class="pageContent _sVC9i48">
		<div class="paddedPage settingsPage">
			<h1>{locale('s_appearance')}</h1>
			<h2>{locale('s_appearance_theme')}</h2>
			<Select
				on:change={(e) => {
					refreshTheme(localstore.get('theme'), e.target.value);
					localstore.set('theme', e.target.value);
				}}
			>
				{#each themes as theme}
					<SelectItem
						value={theme.id}
						name={theme.name}
						selected={localstore.get('theme') === theme.id
							? true
							: false}
					/>
				{/each}
			</Select>
			<h2>{locale('s_appearance_font')}</h2>
			<Select
				on:change={(e) => {
					refreshFont(localstore.get('font'), e.target.value);
					localstore.set('font', e.target.value);
				}}
			>
				{#each fonts as font}
					<SelectItem
						value={font.id}
						name={font.name}
						selected={localstore.get('font') === font.id
							? true
							: false}
					/>
				{/each}
			</Select>

			<Toggle label="Use blur effects" />

			<h1>{locale('s_behavior')}</h1>
			<h1>{locale('s_account')}</h1>
		</div>
	</div>
</template>
