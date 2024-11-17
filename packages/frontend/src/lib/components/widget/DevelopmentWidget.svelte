<script lang="ts">
	import WidgetBase from '$lib/components/WidgetBase.svelte';
	import Store from '$lib/store';
	import { goto } from '$app/navigation';

	let ckey: String;
	let cval: String;

	function setCookie() {
		document.cookie = ckey + '=' + cval + ';';
	}

	let sActiveRequests: Number;
	let sAppReload: Boolean;
	let sViewRefresh: Boolean;
	let sSelfRefresh: Boolean;

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

<WidgetBase>
	<b>cookie setter</b>
	<br />
	<input bind:value={ckey} placeholder="key" />
	<input bind:value={cval} placeholder="val" />
	<button on:click={() => setCookie()}>set</button>
	<br /><br />
	<b>stores</b>
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
