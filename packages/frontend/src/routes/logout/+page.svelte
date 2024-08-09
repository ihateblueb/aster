<script>
	import { goto } from '$app/navigation';
	import Loading from '$lib/components/Loading.svelte';
	import Store from '$lib/utils/Store';

	Store.del('a_token');
	document.cookie = 'a_token=;';

	location.replace('/');
</script>

<template>
	<div class="pageContent">
		<div class="paddedPage">
			<Loading />
		</div>
	</div>
</template>
