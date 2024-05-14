<script>
	import Avatar from '$lib/components/Avatar.svelte';

	export let data;

	let cwOpen = false;

	function toggleCw() {
		if (cwOpen) {
			cwOpen = false;
		} else if (!cwOpen) {
			cwOpen = true;
		}
	}
</script>

<article class="note">
	<div class="noteHeader">
		<Avatar data={data.author} size="45px" />
		<div class="names">
			<span class="displayname">{data.author.displayname}</span>
			<span class="username">@{data.author.username}</span>
		</div>
	</div>

	{#if data.cw}
		<p>{data.cw}</p>
		<button on:click={toggleCw}>cw open {cwOpen}</button>
		{#if cwOpen}
			<p>{data.content}</p>
		{/if}
	{:else}
		<p>{data.content}</p>
	{/if}
</article>

<style lang="scss">
	.noteHeader {
		display: flex;
		> .names {
			margin-left: 10px;
			> span {
				display: block;
				&.displayname {
					font-weight: 600;
				}
			}
		}
	}
</style>
