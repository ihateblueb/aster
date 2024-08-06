<script>
	import { page } from '$app/stores';
	import { locale } from '$lib/locale';

	import PageHeader from '$lib/components/PageHeader.svelte';
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import Select from '$lib/components/Select.svelte';
	import SelectItem from '$lib/components/SelectItem.svelte';
	import Store from '$lib/utils/Store';

	import themes from '../../../static/themes/themes.json';

	function refreshTheme(oldTheme, newTheme) {
		document.body.classList.replace(
			'theme-' + oldTheme,
			'theme-' + newTheme
		);
	}

	import fonts from '../../../static/fonts/fonts.json';

	function refreshFont(oldFont, newFont) {
		document.body.classList.replace('font-' + oldFont, 'font-' + newFont);
	}
</script>

<template>
	<PageHeader title={locale('settings')} icon="settings" />
	<div class="pageContent _sVC9i48">
		<div class="paddedPage settingsPage">
			<h1>{locale('s_appearance')}</h1>
			<h2>{locale('s_appearance_theme')}</h2>
			<Select>
				{#each themes as theme}
					<SelectItem
						value={theme.id}
						name={theme.name}
						on:click={() => {
							refreshTheme(Store.get('theme'), theme.id);
							Store.set('theme', theme.id);
						}}
						selected={Store.get('theme') === theme.id
							? true
							: false}
					/>
				{/each}
			</Select>
			<h2>{locale('s_appearance_font')}</h2>
			<Select>
				{#each fonts as font}
					<SelectItem
						value={font.id}
						name={font.name}
						on:click={() => {
							refreshFont(Store.get('font'), font.id);
							Store.set('font', font.id);
						}}
						selected={Store.get('font') === font.id ? true : false}
					/>
				{/each}
			</Select>

			<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
			<label for="vehicle1">Use blur effects</label><br />

			<h1>{locale('s_behavior')}</h1>
			<h1>{locale('s_account')}</h1>
		</div>
	</div>
</template>
