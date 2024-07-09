<script>
	export let data;
</script>

<template>
	<div
		class="instanceTicker"
		style={'background-color: ' +
			(data.color ? data.color : 'var(--bg-accent)') +
			';'}
		title={data.software + ' ' + data.version}
	>
		<img src={data.icon} height="14px" />
		{data.name ? data.name : data.host}
	</div>
</template>

<style lang="scss">
	.instanceTicker {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: var(--font-xs);
		user-select: none;
		border-radius: var(--border-xxl);
		padding: 1px 4px;
		font-weight: 700;

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
