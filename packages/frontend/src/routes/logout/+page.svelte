<script>
	import Loading from '$lib/components/Loading.svelte';
	import localstore from '$lib/utils/localstore';

	localstore.del('a_token');
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
