<script lang="ts">
	import { goto } from '$app/navigation';

	export let type: string = '';
	export let to: string = '';
</script>

<template>
	{#if to}
		<button class="dropdownItem _H482b0n" on:click={() => goto(to)}>
			<slot></slot>
		</button>
	{:else}
		<button class={'dropdownItem _H482b0n ' + type} on:click>
			<slot></slot>
		</button>
	{/if}
</template>
