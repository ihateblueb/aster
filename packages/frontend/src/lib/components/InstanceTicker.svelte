<script>
	export let data;
</script>

<template>
	<div
		class="instanceTicker _9l3VJ3E"
		style={'background-color: ' +
			(data.color ? data.color : 'var(--bg-accent)') +
			';'}
		title={(data.name ? data.name : data.host) +
			' running ' +
			data.software +
			' ' +
			data.version}
	>
		<img src={data.icon} height="14px" />
		<span>{data.name ? data.name : data.host}</span>
	</div>
</template>
