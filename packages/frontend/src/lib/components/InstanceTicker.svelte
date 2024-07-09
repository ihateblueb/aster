<script>
	export let data;
</script>

<template>
	<div
		class="instanceTicker"
		title={(data.name ? data.name : data.host) +
			' running ' +
			data.software +
			' ' +
			data.version}
	>
		<img src={data.icon} height="14px" />
	</div>
</template>

<style lang="scss">
	.instanceTicker {
		display: flex;
		align-items: center;
		gap: 4px;
		user-select: none;
		padding: 1px 0px;
		font-weight: 700;
		margin-top: 4px;

		max-width: 135px;

		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;

		img {
			min-width: 16px;
			min-height: 16px;
		}
	}
</style>
