<script lang="ts">
	import WidgetBase from '$lib/components/WidgetBase.svelte';
	import Store from '$lib/store.js';
	import { goto } from '$app/navigation';
	import Input from '../Input.svelte';
	import Button from '../Button.svelte';
	import { IconCode } from '@tabler/icons-svelte';

	let ckey: undefined | String = $state();
	let cval: undefined | String = $state();

	function setCookie() {
		document.cookie = ckey + '=' + cval + '; path=/';
	}

	let sActiveRequests: undefined | Number = $state();
	let sAppReload: undefined | Boolean = $state();
	let sViewRefresh: undefined | Boolean = $state();
	let sSelfRefresh: undefined | Boolean = $state();

	Store.activeRequests.subscribe((e) => {
		sActiveRequests = e;
	});
	Store.appReload.subscribe((e) => {
		sAppReload = e;
	});
	Store.viewRefresh.subscribe((e) => {
		sViewRefresh = e;
	});
	Store.selfRefresh.subscribe((e) => {
		sSelfRefresh = e;
	});
</script>

<WidgetBase header>
	<svelte:fragment slot="header">
		<IconCode size="var(--fs-lg)" />
		Development
	</svelte:fragment>

	<b>cookie setter</b>
	<br />
	<Input bind:value={ckey} wide placeholder="key" />
	<Input bind:value={cval} wide placeholder="val" />
	<Button on:click={() => setCookie()}>set</Button>
	<br />
	<p>
		activeRequests: {sActiveRequests}
		<button on:click={() => Store.activeRequests.set(sActiveRequests + 1)}
			>+</button
		>
		<button on:click={() => Store.activeRequests.set(sActiveRequests - 1)}
			>-</button
		>
		<br />
		appReload: {sAppReload}
		<button on:click={() => Store.appReload.set(!sAppReload)}>!</button><br
		/>
		viewRefresh: {sViewRefresh}
		<button on:click={() => Store.viewRefresh.set(!sViewRefresh)}>!</button
		><br />
		selfRefresh: {sSelfRefresh}
		<button on:click={() => Store.selfRefresh.set(!sSelfRefresh)}>!</button
		><br />
	</p>
	<a href="/">a /</a>
	<a href="/styletest">a /styletest</a>
	<a href="/settings">a /settings</a>
</WidgetBase>
