<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Mfm from '$lib/components/Mfm.svelte';
	import Button from '$lib/components/Button.svelte';
</script>

<div class="paddedPage">
	<Mfm
		content="$[x2 **aster**]
awesome $[small (terrible)] $[spin.x work in progress] fedi software that's $[jelly silly]"
	/>
	<br />
	<Button type="bg-primary" to="/login">Login</Button>
	<Button type="bg-primary" to="/register">Register</Button>
	<br />
	<Button type="bg-primary" to="/notes/a2c2ca31-5487-4d44-a8d7-eacaebf71a7d"
		>See Example Note</Button
	>
	<Button type="bg-primary" to="/@breen">See Example Profile</Button>
	<br />
	<Button type="bg-primary" to="/playground">MFM Playground</Button>
</div>
