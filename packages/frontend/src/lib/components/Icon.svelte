<script>
	export let color = 'var(--txt-primary)';
	export let size = '22px';
	export let name = 'question-mark';
	export let margin = '0px 0px 0px 0px';
</script>

<i
	class="ti ti-{name}"
	style="font-size: {size}; margin: {margin}; color: {color};"
></i>

<style>
	@import '../../../node_modules/@tabler/icons-webfont/dist/tabler-icons.min.css';
	@font-face {
		font-family: 'tabler-icons';
		font-style: normal;
		font-weight: 400;
		src:
			url('/fonts/icons/tabler-icons.woff2?v3.4.0') format('woff2'),
			url('/fonts/icons/tabler-icons.woff?') format('woff'),
			url('/fonts/icons/tabler-icons.ttf?v3.4.0') format('truetype');
	}
</style>
