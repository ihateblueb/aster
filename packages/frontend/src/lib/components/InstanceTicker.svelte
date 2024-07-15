<script>
	export let data;
</script>

<template>
	<div
		class="instanceTicker _9l3VJ3E"
		title={(data.name ? data.name : data.host) +
			' running ' +
			data.software +
			' ' +
			data.version}
	>
		<img src={data.icon} height="14px" />
	</div>
</template>
