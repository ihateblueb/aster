<script lang="ts">
	export let data;
</script>

<template>
	<img class="emoji" src={data.url} />
</template>

<style lang="scss">
	.emoji {
		height: 25px;
	}
</style>
