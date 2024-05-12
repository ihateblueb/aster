<script>
	import { page } from '$app/stores';

/** @type {import('./$types').PageData} */
export let data;
</script>

<div>
	<h1>{data.displayname}</h1>
	<h2>@{data.username}</h2>
	<p>{data.bio}</p>
</div>
