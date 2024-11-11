<script lang="ts">
	import { page } from '$app/stores';

	let host = $page.url.host;
</script>

<div class="welcome">
	<div class="left">
		<h1>{host}</h1>
		<button> Login </button>
		<button> Register </button>
	</div>
</div>

<style lang="scss">
	.welcome {
		display: flex;

		h1 {
			font-size: var(--fs-md);
		}
	}
</style>
