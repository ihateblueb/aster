<script>
	import { page } from '$app/stores';
	import { locale } from '$lib/locale';

	import PageHeader from '$lib/components/PageHeader.svelte';
	import Note from '$lib/components/Note.svelte';
	import Button from '$lib/components/Button.svelte';

	import { JsonView } from '@zerodevx/svelte-json-view';

	export let data;
</script>

<template>
	<PageHeader title={data.data.id} icon="code" />
	<div class="pageContent">
		<div class="raw">
			<JsonView json={data.data} />
		</div>
	</div>
</template>
