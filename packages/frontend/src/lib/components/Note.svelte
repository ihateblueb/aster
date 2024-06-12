<script lang="ts">
	import { goto } from '$app/navigation';
	import { locale } from '$lib/locale';

	import Avatar from '$lib/components/Avatar.svelte';
	import Mfm from '$lib/components/Mfm.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Dropdown from './Dropdown.svelte';
	import DropdownItem from './DropdownItem.svelte';

	import noteBookmark from '$lib/api/note/bookmark';
	import noteDelete from '$lib/api/note/delete';
	import noteReact from '$lib/api/note/react';
	import noteRepeat from '$lib/api/note/repeat';
	import notePin from '$lib/api/note/pin';
	import noteUnpin from '$lib/api/note/unpin';

	import userBite from '$lib/api/user/bite';

	export let data;
	export let pinned: boolean = false;
	export let repeated: boolean = false;
	export let repeatedBy: string = '';
	export let detailed: boolean = false;

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
		{#if pinned}
			<div class="notePreheader">
				<Icon
					name="pin"
					size="16px"
					color="var(--txt-tertiary)"
					margin="0px 5px 0px 0px"
				/>
				<span> {locale('note_pinned')} </span>
			</div>
		{/if}
		{#if repeated}
			<div class="notePreheader">
				<Icon
					name="repeat"
					size="16px"
					color="var(--txt-tertiary)"
					margin="0px 5px 0px 0px"
				/>
				<span> {repeatedBy} {locale('repeated')} </span>
			</div>
		{/if}
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
						title={locale('public')}
					/>
				{:else if data.visibility === 'unlisted'}
					<Icon
						name="home"
						size="18px"
						color="var(--txt-primary)"
						title={locale('unlisted')}
					/>
				{:else if data.visibility === 'followers'}
					<Icon
						name="lock"
						size="18px"
						color="var(--txt-primary)"
						title={locale('followers_only')}
					/>
				{:else if data.visibility === 'direct'}
					<Icon
						name="mail"
						size="18px"
						color="var(--txt-primary)"
						title={locale('direct_note')}
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
								{locale('close')}
							{:else}
								{locale('open')}
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
					{locale('posted_at')}
					{new Date(data.created_at).toLocaleTimeString(undefined, {
						weekday: 'long',
						month: 'long',
						day: 'numeric',
						year: 'numeric',
						hour: 'numeric',
						minute: '2-digit',
						second: '2-digit'
					})}
				</div>
			{/if}
		</p>

		<div class="noteFooter">
			<div class="postButtons">
				<button>
					<Icon name="arrow-back-up" size="20px" color="inherit" />
				</button>
				<button>
					<Icon name="quote" size="20px" color="inherit" />
				</button>
				<button on:click={() => noteRepeat(data.id)}>
					<Icon name="repeat" size="20px" color="inherit" />
				</button>
				<button on:click={() => noteReact(data.id)}>
					<Icon name="star" size="20px" color="inherit" />
				</button>
				<button>
					<Icon name="plus" size="20px" color="inherit" />
				</button>
				<button on:click={() => noteBookmark(data.id)}>
					<Icon name="bookmark" size="20px" color="inherit" />
				</button>
				<button on:click={(e) => more.open(e)}>
					<Icon name="dots" size="20px" color="inherit" />
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
				<span>{locale('expand_note')}</span>
			</DropdownItem>
			<hr />
		{/if}
		<DropdownItem>
			<Icon size="18px" name="link" margin="0px 8px 0px 0px" />
			<span>{locale('copy_link')}</span>
		</DropdownItem>
		{#if !data.local}
			<DropdownItem>
				<Icon size="18px" name="link" margin="0px 8px 0px 0px" />
				<span>{locale('copy_link_origin')}</span>
			</DropdownItem>
			<DropdownItem>
				<Icon
					size="18px"
					name="external-link"
					margin="0px 8px 0px 0px"
				/>
				<span>{locale('view_on_remote')}</span>
			</DropdownItem>
			<hr />
		{/if}
		<DropdownItem>
			<Icon size="18px" name="copy" margin="0px 8px 0px 0px" />
			<span>{locale('copy_note_id')}</span>
		</DropdownItem>
		<DropdownItem>
			<Icon size="18px" name="copy" margin="0px 8px 0px 0px" />
			<span>{locale('copy_user_id')}</span>
		</DropdownItem>
		<hr />
		<DropdownItem>
			<Icon
				size="18px"
				name="exclamation-circle"
				margin="0px 8px 0px 0px"
			/>
			<span>{locale('report_note')}</span>
		</DropdownItem>
		<DropdownItem>
			<Icon
				size="18px"
				name="exclamation-circle"
				margin="0px 8px 0px 0px"
			/>
			<span>{locale('report_user')}</span>
		</DropdownItem>
		<hr />
		<DropdownItem on:click={() => userBite(data.author.id)}>
			<Icon size="18px" name="dental" margin="0px 8px 0px 0px" />
			<span>{locale('bite_user')}</span>
		</DropdownItem>
		<hr />
		{#if !pinned}
			<DropdownItem on:click={() => notePin(data.id)}>
				<Icon size="18px" name="pin" margin="0px 8px 0px 0px" />
				<span>{locale('pin_note')}</span>
			</DropdownItem>
		{:else}
			<DropdownItem on:click={() => noteUnpin(data.id)}>
				<Icon size="18px" name="pin" margin="0px 8px 0px 0px" />
				<span>{locale('unpin_note')}</span>
			</DropdownItem>
		{/if}
		<hr />
		<DropdownItem>
			<Icon size="18px" name="pencil" margin="0px 8px 0px 0px" />
			<span>{locale('edit_note')}</span>
		</DropdownItem>
		<DropdownItem type="danger" on:click={() => noteDelete(data.id)}>
			<Icon
				size="18px"
				name="trash"
				color="var(--danger)"
				margin="0px 8px 0px 0px"
			/>
			<span>{locale('delete_edit_note')}</span>
		</DropdownItem>
		<DropdownItem type="danger" on:click={() => noteDelete(data.id)}>
			<Icon
				size="18px"
				name="trash"
				color="var(--danger)"
				margin="0px 8px 0px 0px"
			/>
			<span>{locale('delete_note')}</span>
		</DropdownItem>
	</Dropdown>
</template>

<style lang="scss">
	hr {
		width: calc(100% - 16px);
		margin-left: 8px;
		margin-right: 8px;
		border: 0px solid;
		border-top: var(--border-width-s) solid var(--bg-accent);
	}
	.noteContent {
		margin-top: 10px;
		margin-bottom: 10px;
	}
	.note {
		margin: 10px;
		padding: 20px;
		border-radius: var(--border-xl);
		background-color: var(--bg-secondary);
	}
	.details {
		color: var(--txt-tertiary);
		margin-top: 10px;
	}
	.notePreheader {
		display: flex;
		align-items: center;
		font-size: var(--font-s);
		color: var(--txt-tertiary);
		margin-bottom: 10px;
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
						font-size: var(--font-m);
					}
				}
			}
		}
		.right {
			display: flex;
			gap: 4px;
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
		border-radius: var(--border-m);

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
			border-radius: var(--border-s);
		}
	}
</style>
