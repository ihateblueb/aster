<script>
	import { page } from '$app/stores';
</script>

<div class=errorPage>
	<h1>{$page.status}</h1>
	<h2>{$page.error.message}</h2>
</div>

<style lang="scss">
.errorPage {
	margin-top: 10px;
	text-align: center;
}
</style>
