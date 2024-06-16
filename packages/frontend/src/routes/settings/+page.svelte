<script>
	import { page } from '$app/stores';
	import { locale } from '$lib/locale';

	import PageHeader from '$lib/components/PageHeader.svelte';
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import Select from '$lib/components/Select.svelte';
	import SelectItem from '$lib/components/SelectItem.svelte';
</script>

<template>
	<PageHeader title={locale('settings')} />
	<div class="pageContent">
		<div class="paddedPage">
			<h1>{locale('s_appearance')}</h1>
			<h2>{locale('s_appearance_theme')}</h2>
			<Select>
				<SelectItem value="purpura" name="Purpura" />
				<SelectItem value="rosepine" name="Rose Pine" />
				<SelectItem value="iceshrimp" name="Iceshrimp" />
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
