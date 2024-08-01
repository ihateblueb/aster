<script lang="ts">
	export let time;

	let timer = 0;

	function timeAgo(time) {
		// TODO: rewrite this. it sucks. its stolen from masto-aster

		switch (typeof time) {
			case 'number':
				break;
			case 'string':
				time = +new Date(time);
				break;
			case 'object':
				if (time.constructor === Date) time = time.getTime();
				break;
			default:
				time = +new Date();
		}
		var time_formats = [
			[60, 's', 1],
			[120, '1m', '1m'],
			[3600, 'm', 60],
			[7200, '1h', '1h'],
			[86400, 'h', 3600],
			[604800, 'd', 86400],
			[2419200, 'w', 604800],
			[29030400, 'mo', 2419200],
			[2903040000, 'y', 29030400]
		];
		var seconds = (+new Date() - time) / 1000,
			list_choice = 1;
		if (seconds === 0) {
			return 'now';
		}
		var i = 0,
			format;
		while ((format = time_formats[i++]))
			if (seconds < format[0]) {
				if (typeof format[2] == 'string') return format[list_choice];
				else return Math.floor(seconds / format[2]) + format[1];
			}
		return time;
	}

	timer = setInterval(() => {
		timer += 1;
	}, 5000);
</script>

<template>
	<time class="time" title={new Date(time).toLocaleString()}>
		{#key timer}
			<span>{timeAgo(time)}</span>
		{/key}
	</time>
</template>

<style lang="scss">
	.time {
		font-size: var(--font-s);
	}
</style>
