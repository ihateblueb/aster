<script>
	import Error from '$lib/components/Error.svelte';
</script>

{#snippet failed(error, reset)}
	<Error message={error?.message} retry={reset} />
{/snippet}

<svelte:boundary {failed}><slot /></svelte:boundary>
