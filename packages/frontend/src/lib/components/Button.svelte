<script>
	export let type = 'primary';
	export let to = '/';
</script>

<a class="btn {type}" href={to}>
	<slot></slot>
</a>

<style lang="scss">
	.btn {
		cursor: pointer;
		display: inline-block;
		background-color: var(--bg-tertiary);
		color: var(--txt-secondary);
		text-decoration: none;
		padding: 8px 14px;
		margin: 4px;
		border-radius: 8px;

		&.header {
			border: none;
			background-color: transparent;
			padding: 0px;
			margin: 0px;
			margin-right: 5px;
		}
	}
</style>
