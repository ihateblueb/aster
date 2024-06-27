<script>
	import { page } from '$app/stores';
	import { locale } from '$lib/locale';

	import PageHeader from '$lib/components/PageHeader.svelte';
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';
</script>

<template>
	<PageHeader title={'#' + $page.params.tagid} />
	<div class="pageContent">
		<div class="paddedPage"></div>
	</div>
</template>
