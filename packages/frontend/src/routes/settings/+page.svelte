<script>
	import { page } from '$app/stores';
	import { locale } from '$lib/locale';

	import PageHeader from '$lib/components/PageHeader.svelte';
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import Select from '$lib/components/Select.svelte';
	import SelectItem from '$lib/components/SelectItem.svelte';
	import Store from '$lib/utils/Store';

	function refreshTheme(oldTheme, newTheme) {
		document.body.classList.replace(oldTheme, newTheme);
	}
</script>

<template>
	<PageHeader title={locale('settings')} icon="settings" />
	<div class="pageContent">
		<div class="paddedPage">
			<h1>{locale('s_appearance')}</h1>
			<h2>{locale('s_appearance_theme')}</h2>
			<Select>
				<SelectItem
					value="purpura"
					name="Purpura"
					on:click={() => {
						refreshTheme(Store.get('theme'), 'purpura');
						Store.set('theme', 'purpura');
					}}
					selected={Store.get('theme') === 'purpura' ? true : false}
				/>
				<SelectItem
					value="rosepine"
					name="Rose Pine"
					on:click={() => {
						refreshTheme(Store.get('theme'), 'rosepine');
						Store.set('theme', 'rosepine');
					}}
					selected={Store.get('theme') === 'rosepine' ? true : false}
				/>
				<SelectItem
					value="iceshrimp"
					name="Iceshrimp"
					on:click={() => {
						refreshTheme(Store.get('theme'), 'iceshrimp');
						Store.set('theme', 'iceshrimp');
					}}
					selected={Store.get('theme') === 'iceshrimp' ? true : false}
				/>
			</Select>
			<h1>{locale('s_behavior')}</h1>
			<h1>{locale('s_account')}</h1>
		</div>
	</div>
</template>

<style lang="scss">
	h1 {
		font-size: var(--font-xxl);
		margin-bottom: 12px;
	}
	h2 {
		font-size: var(--font-xl);
		margin-bottom: 10px;
	}
</style>
