<script>
	import Store from '$lib/scripts/Store';

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

	let noteRes = {};

	async function deleteNote() {
		var noteReq = await fetch(`/api/v1/note`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${Store.get('a_token')}`
			},
			body: JSON.stringify({
				id: data.id
			})
		});

		noteRes = await noteReq.json();

		if (noteReq.status === 200) {
			console.log(noteRes);
		} else {
			console.log(noteRes);
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
			<div class="right">
				{#if data.visibility === 'public'}
					<Icon
						name="planet"
						size="18px"
						color="var(--txt-primary)"
						title="Public"
					/>
				{:else if data.visibility === 'unlisted'}
					<Icon
						name="home"
						size="18px"
						color="var(--txt-primary)"
						title="Unlisted"
					/>
				{:else if data.visibility === 'followers'}
					<Icon
						name="lock"
						size="18px"
						color="var(--txt-primary)"
						title="Followers Only"
					/>
				{:else if data.visibility === 'direct'}
					<Icon
						name="mail"
						size="18px"
						color="var(--txt-primary)"
						title="Direct Note"
					/>
				{/if}
			</div>
		</div>

		<p class="noteContent">
			{#if data.cw}
				<div class="warning" class:isOpen={cwOpen}>
					<div class="left">
						<Icon
							name="alert-triangle"
							size="18px"
							color="var(--warn)"
							margin="0px 7px 0px 0px"
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
				<div class="details">
					Posted at {new Date(data.created_at).toLocaleTimeString(
						undefined,
						{
							weekday: 'long',
							month: 'long',
							day: 'numeric',
							year: 'numeric',
							hour: 'numeric',
							minute: '2-digit',
							second: '2-digit'
						}
					)}
				</div>
			{/if}
			<div class="postButtons">
				<button>
					<Icon name="arrow-back-up" color="inherit" />
				</button>
				<button>
					<Icon name="quote" color="inherit" />
				</button>
				<button>
					<Icon name="repeat" color="inherit" />
				</button>
				<button>
					<Icon name="star" color="inherit" />
				</button>
				<button>
					<Icon name="plus" color="inherit" />
				</button>
				<button>
					<Icon name="bookmark" color="inherit" />
				</button>
				<button on:click={deleteNote}>
					<Icon name="trash" color="var(--danger)" />
				</button>
				<button>
					<Icon name="dots" color="inherit" />
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
	.noteFooter {
		.details {
			color: var(--txt-tertiary);
			margin-bottom: 10px;
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
				color: var(--txt-secondary);
				cursor: pointer;
				transition: 0.1s;

				&:hover {
					color: var(--txt-primary);
				}
			}
		}
	}
	.warning {
		display: flex;
		align-items: center;
		color: var(--warn);
		background-color: var(--warn-20);
		padding: 4px 6px;
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

			> button {
				font-family: var(--font);
			}
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
