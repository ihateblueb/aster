<script>
	export let type = 'primary';
	export let to = '/';
</script>

<a class="btn {type}" href={to}>
	<slot></slot>
</a>
