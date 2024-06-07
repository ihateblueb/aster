<script lang="ts">
	import { goto } from '$app/navigation';
	import Store from '$lib/scripts/Store';

	import Avatar from '$lib/components/Avatar.svelte';
	import Mfm from '$lib/components/Mfm.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Dropdown from './Dropdown.svelte';
	import DropdownItem from './DropdownItem.svelte';

	import noteBookmark from '$lib/api/note/bookmark';
	import noteDelete from '$lib/api/note/delete';
	import noteReact from '$lib/api/note/react';
	import noteRepeat from '$lib/api/note/repeat';

	import userBite from '$lib/api/user/bite';

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

	let more: Dropdown;
</script>

<template>
	<article class="note">
		<div class="noteHeader">
			<div class="left">
				<a href={'/@' + data.author.username} class="displayname subtle"
					><Avatar data={data.author} size="45px" /></a
				>
				<div class="names">
					<a
						href={'/@' + data.author.username}
						class="displayname subtle">{data.author.displayname}</a
					>
					<a
						href={'/@' + data.author.username}
						class="username subtle">@{data.author.username}</a
					>
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
		</p>

		<div class="noteFooter">
			<div class="postButtons">
				<button>
					<Icon name="arrow-back-up" color="inherit" />
				</button>
				<button>
					<Icon name="quote" color="inherit" />
				</button>
				<button on:click={() => noteRepeat(data.id)}>
					<Icon name="repeat" color="inherit" />
				</button>
				<button on:click={() => noteReact(data.id)}>
					<Icon name="star" color="inherit" />
				</button>
				<button>
					<Icon name="plus" color="inherit" />
				</button>
				<button on:click={() => noteBookmark(data.id)}>
					<Icon name="bookmark" color="inherit" />
				</button>
				<button on:click={(e) => more.open(e)}>
					<Icon name="dots" color="inherit" />
				</button>
			</div>
		</div>
	</article>

	<Dropdown bind:this={more}>
		{#if !detailed}
			<DropdownItem to={'/notes/' + data.id}>
				<Icon
					size="18px"
					name="arrows-maximize"
					margin="0px 8px 0px 0px"
				/>
				<span>Expand note</span>
			</DropdownItem>
			<hr />
		{/if}
		<DropdownItem>
			<Icon size="18px" name="link" margin="0px 8px 0px 0px" />
			<span>Copy link</span>
		</DropdownItem>
		{#if !data.local}
			<DropdownItem>
				<Icon size="18px" name="link" margin="0px 8px 0px 0px" />
				<span>Copy link (origin)</span>
			</DropdownItem>
			<DropdownItem>
				<Icon
					size="18px"
					name="external-link"
					margin="0px 8px 0px 0px"
				/>
				<span>View on remote instance</span>
			</DropdownItem>
			<hr />
		{/if}
		<DropdownItem>
			<Icon size="18px" name="copy" margin="0px 8px 0px 0px" />
			<span>Copy note id</span>
		</DropdownItem>
		<DropdownItem>
			<Icon size="18px" name="copy" margin="0px 8px 0px 0px" />
			<span>Copy user id</span>
		</DropdownItem>
		<hr />
		<DropdownItem>
			<Icon
				size="18px"
				name="exclamation-circle"
				margin="0px 8px 0px 0px"
			/>
			<span>Report note</span>
		</DropdownItem>
		<DropdownItem>
			<Icon
				size="18px"
				name="exclamation-circle"
				margin="0px 8px 0px 0px"
			/>
			<span>Report user</span>
		</DropdownItem>
		<hr />
		<DropdownItem on:click={() => userBite(data.id)}>
			<Icon size="18px" name="dental" margin="0px 8px 0px 0px" />
			<span>Bite user</span>
		</DropdownItem>
		<hr />
		<DropdownItem>
			<Icon size="18px" name="pencil" margin="0px 8px 0px 0px" />
			<span>Edit note</span>
		</DropdownItem>
		<DropdownItem type="danger" on:click={() => noteDelete(data.id)}>
			<Icon
				size="18px"
				name="trash"
				color="var(--danger)"
				margin="0px 8px 0px 0px"
			/>
			<span>Delete note</span>
		</DropdownItem>
	</Dropdown>
</template>

<style lang="scss">
	hr {
		width: calc(100% - 12px);
		margin-left: 6px;
		margin-right: 6px;
		border-top: 1px solid var(--bg-accent);
		border-bottom: 0px;
		border-left: 0px;
		border-right: 0px;
	}
	.noteContent {
		margin-top: 15px;
		margin-bottom: 15px;
	}
	.note {
		margin: 10px;
		padding: 20px;
		border-radius: 12px;
		background-color: var(--bg-secondary);
	}
	.details {
		color: var(--txt-tertiary);
		margin-top: 10px;
	}
	.noteHeader {
		display: flex;
		.left {
			display: flex;
			flex-grow: 2;
			> .names {
				display: inline-flex;
				justify-content: center;
				flex-direction: column;
				margin-left: 10px;
				> a {
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
