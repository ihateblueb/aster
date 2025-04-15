<script lang="ts">
	import translations from '$lib/translations';

	let { id, args = {} } = $props();

	const value = translations.getMessage(id)?.value;
</script>

{#if value}
	{translations.formatPattern(value, args)}
{:else}
	{id}
{/if}
