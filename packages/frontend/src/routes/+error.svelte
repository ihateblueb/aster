<script>
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import Icon from '$lib/components/Icon.svelte';
</script>

<svelte:head>
	<title>Uh oh!</title>
</svelte:head>

<div class="paddedPage">
	<h1>{$page.status}</h1>
	<h2>{$page.error.message}</h2>
</div>

<div class="errorPage"></div>
