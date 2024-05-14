<script>
	import Avatar from '$lib/components/Avatar.svelte';

	export let data;
	export let detailed;

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
		<div class=left>
		<Avatar data={data.author} size="45px" />
		<div class="names">
			<span class="displayname">{data.author.displayname}</span>
			<span class="username">@{data.author.username}</span>
		</div>
		</div>
		<div class=right>
			now
		</div>
	</div>

	<p class=noteContent>
		{#if data.cw}
		<p>{data.cw}</p>
		<button on:click={toggleCw}>cw open {cwOpen}</button>
		{#if cwOpen}
			<p>{data.content}</p>
		{/if}
	{:else}
		<p>{data.content}</p>
	{/if}
	</p>

	<div class=noteFooter>
	{#if detailed}
		Posted at {data.created_at}
	{/if}
		<div class=postButtons>
			<button>Reply</button>
			<button>Quote</button>
			<button>Repeat</button>
			<button>Like</button>
			<button>React</button>
			<button>Bookmark</button>
			<button>More</button>
		</div>
	</div>
</article>

<style lang="scss">
	.noteContent {
		margin-top: 10px;
		margin-bottom: 10px;
	}
	.note {
		margin: 10px;
		padding: 16px;
		border-radius: 12px;
		background-color: var(--bg-secondary);
	}
	.noteHeader {
		display: flex;
		.left {
			display:flex;
			flex-grow: 2;
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
	}
</style>
