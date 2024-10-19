<script lang="ts">
	let key: String;
	let value: String;

	function setCookie() {
		document.cookie = key + '=' + value + ';';
	}
</script>

aster a work in progress fedi software see <a href="https://git.gay/blueb/aster"
	>https://git.gay/blueb/aster</a
>
for source and <a href="/swagger">/swagger</a> for api endpoints

<h2>token cookie setter</h2>
<input bind:value={key} /> <input bind:value />
<button on:click={() => setCookie()}>set</button>
