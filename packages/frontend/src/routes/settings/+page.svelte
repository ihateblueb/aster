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
		document.body.classList.replace(oldTheme, newTheme);
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
			<h1>{locale('s_behavior')}</h1>
			<h1>{locale('s_account')}</h1>
		</div>
	</div>
</template>
