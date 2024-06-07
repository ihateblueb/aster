<script lang="ts">
	export let type = 'primary';
	export let to = '/';
</script>

<template>
	<a class="btn {type}" href={to}>
		<slot></slot>
	</a>
</template>
