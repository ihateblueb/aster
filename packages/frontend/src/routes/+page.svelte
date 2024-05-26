<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Mfm from '$lib/components/Mfm.svelte';
	import LinkButton from '$lib/components/LinkButton.svelte';
</script>

<template>
	<PageHeader title="Welcome" />
	<div class="pageContent">
		<div class="paddedPage">
			<Mfm
				content="$[x2 **aster**]
awesome $[small (terrible)] $[spin.x work in progress] fedi software that's $[jelly silly]"
			/>
			<br />
			<LinkButton type="bg-primary" to="/login">Login</LinkButton>
			<LinkButton type="bg-primary" to="/register">Register</LinkButton>
			<br />
			<LinkButton
				type="bg-primary"
				to="/notes/aee066ac-a4e8-4442-8c58-e981cded9964"
				>See Example Note</LinkButton
			>
			<LinkButton type="bg-primary" to="/@breen"
				>See Example Profile</LinkButton
			>
			<br />
			<LinkButton type="bg-primary" to="/playground"
				>MFM Playground</LinkButton
			>
		</div>
	</div>
</template>
