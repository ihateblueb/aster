<script>
	import { page } from '$app/stores';

	export let data;
</script>

<h1>yaaaaaaaaay notes</h1>
<p>noteid {$page.params.noteid}</p>

<div>{@html data}</div>
