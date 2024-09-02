<script lang="ts">
	export let value: string = '';
	export let name: string = '';
	export let selected: boolean = false;
</script>

<template>
	<option {value} {selected} on:click>{name}</option>
</template>
