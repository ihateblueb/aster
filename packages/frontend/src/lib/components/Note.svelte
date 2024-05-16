<script>
	import Avatar from '$lib/components/Avatar.svelte';
	import Mfm from '$lib/components/Mfm.svelte';

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
		<div class="left">
			<Avatar data={data.author} size="45px" />
			<div class="names">
				<span class="displayname">{data.author.displayname}</span>
				<span class="username">@{data.author.username}</span>
			</div>
		</div>
		<div class="right">now</div>
	</div>

	<p class="noteContent">
		{#if data.cw}
			<p>{data.cw}</p>
			<button on:click={toggleCw}>cw open {cwOpen}</button>
			{#if cwOpen}
				<Mfm content={data.content} />
			{/if}
		{:else}
			<Mfm content={data.content} />
		{/if}
	</p>

	<div class="noteFooter">
		{#if detailed}
			Posted at {data.created_at}
		{/if}
		<div class="postButtons">
			<button>
				<i class="ti ti-arrow-back-up"></i>
			</button>
			<button>
				<i class="ti ti-quote"></i>
			</button>
			<button>
				<i class="ti ti-repeat"></i>
			</button>
			<button>
				<i class="ti ti-star"></i>
			</button>
			<button>
				<i class="ti ti-plus"></i>
			</button>
			<button>
				<i class="ti ti-bookmark"></i>
			</button>
			<button>
				<i class="ti ti-dots"></i>
			</button>
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
			display: flex;
			flex-grow: 2;
			> .names {
				margin-left: 10px;
				> span {
					display: block;
					&.displayname {
						font-weight: 600;
					}
					&.username {
						font-size: 15px;
					}
				}
			}
		}
	}
</style>
