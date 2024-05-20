<script>
	import { page } from '$app/stores';
	import Mfm from '$lib/components/Mfm.svelte';

	let mfmContent = '';
</script>

<strong>Input:</strong><br />
<textarea bind:value={mfmContent} />
<br /><br />
<strong>Output:</strong><br />
{#key mfmContent}
	<Mfm content={mfmContent} />
{/key}
