<script>
	import PageHeader from '$lib/components/PageHeader.svelte';
	import PageWrapper from '$lib/components/PageWrapper.svelte';
	import localstore from '$lib/localstore';
	import store from '$lib/store';
	import { goto } from '$app/navigation';
	import Loading from '$lib/components/Loading.svelte';

	localstore.delete('token');
	localstore.delete('self');
	document.cookie =
		'authorization=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';

	goto('/').then(() => store.appReload.set(true));
</script>

<PageHeader title="Logout"></PageHeader>

<PageWrapper centered>
	<Loading />
</PageWrapper>
