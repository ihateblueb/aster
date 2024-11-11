<script lang="ts">
	let key: String;
	let value: String;

	function setCookie() {
		document.cookie = key + '=' + value + ';';
	}
</script>

<h2>cookie setter</h2>
<input bind:value={key} /> <input bind:value />
<button on:click={() => setCookie()}>set</button>
