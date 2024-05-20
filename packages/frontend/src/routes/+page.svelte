<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Mfm from '$lib/components/Mfm.svelte';
	import Button from '$lib/components/Button.svelte';
</script>

<div class="centeredPage">
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
	<Button type="bg-primary" to="/users/262388e2-e60b-4f0a-b7e0-2c6c0d88a203"
		>See Example Profile</Button
	>
	<br />
	<Button type="bg-primary" to="/playground">MFM Playground</Button>
</div>
<!--

	<h1>aster</h1>
<p>wip fedi software</p>
<p>
	to see a profile, check out <a
		href="/users/262388e2-e60b-4f0a-b7e0-2c6c0d88a203">this</a
	>.
</p>
<p>
	to see a note, check out <a
		href="/notes/a2c2ca31-5487-4d44-a8d7-eacaebf71a7d">this</a
	>.
</p>
<p>
	<a href="/playground">mfm playground</a>
</p>
<p>
	<a href="/login">login</a>
</p>
-->
