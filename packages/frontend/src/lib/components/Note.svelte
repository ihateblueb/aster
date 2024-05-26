<script>
	import Avatar from '$lib/components/Avatar.svelte';
	import Mfm from '$lib/components/Mfm.svelte';
	import Icon from '$lib/components/Icon.svelte';

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

<template>
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
				<div class="warning" class:isOpen={cwOpen}>
					<div class="left">
						<Icon
							name="alert-triangle"
							size="18px"
							color="var(--warn)"
							margin="0px 5px 0px 0px"
						/>
						<span>{data.cw}</span>
					</div>
					<div class="right">
						<button on:click={toggleCw}>
							{#if cwOpen}
								Close
							{:else}
								Open
							{/if}
						</button>
					</div>
				</div>
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
					<Icon name="arrow-back-up" />
				</button>
				<button>
					<Icon name="quote" />
				</button>
				<button>
					<Icon name="repeat" color="var(--txt-tertiary)" />
				</button>
				<button>
					<Icon name="star" color="var(--txt-tertiary)" />
				</button>
				<button>
					<Icon name="plus" color="var(--txt-tertiary)" />
				</button>
				<button>
					<Icon name="bookmark" color="var(--txt-tertiary)" />
				</button>
				<button>
					<Icon name="dots" color="var(--txt-tertiary)" />
				</button>
			</div>
		</div>
	</article>
</template>

<style lang="scss">
	.noteContent {
		margin-top: 10px;
		margin-bottom: 10px;
	}
	.note {
		margin: 10px;
		padding: 20px;
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
	.postButtons {
		display: flex;
		justify-content: space-between;
		align-items: center;

		> button {
			background: none;
			border: none;
			margin: 0px;
			padding: 0px;
			color: var(--txt-tertiary);
		}
	}
	.warning {
		display: flex;
		align-items: center;
		color: var(--warn);
		background-color: var(--warn-20);
		padding: 6px;
		border-radius: 8px;

		.left {
			display: inline-flex;
			align-items: center;
			flex-grow: 1;
			padding-left: 3px;
		}
		.right {
			display: inline-flex;
			align-items: center;
			flex-grow: 0;
		}
		&.isOpen {
			margin-bottom: 10px;
		}
		button {
			color: var(--warn);
			background: var(--warn-20);
			border: none;
			padding: 5px 8px;
			border-radius: 6px;
		}
	}
</style>
