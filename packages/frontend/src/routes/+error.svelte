<script>
	import { page } from '$app/stores';
	import { locale } from '$lib/locale';

	import PageHeader from '$lib/components/PageHeader.svelte';
	import Button from '$lib/components/Button.svelte';
	import Icon from '$lib/components/Icon.svelte';
</script>

<template>
	<PageHeader title={locale('ohno')} icon="alert-triangle" />
	<div class="pageContent">
		<div class="paddedPage">
			<h1>{$page.status}</h1>
			<h2>{$page.error.message}</h2>
		</div>
	</div>
</template>

<style lang="scss">
	.paddedPage {
		text-align: center;
	}
</style>
