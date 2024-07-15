<script lang="ts">
	export let type = '';
	export let to = '';
</script>

<template>
	{#if to}
		<a class="btn _oD12hh4 {type}" href={to} on:click>
			<slot></slot>
		</a>
	{:else}
		<button class="btn _oD12hh4 {type}" on:click>
			<slot></slot>
		</button>
	{/if}
</template>
