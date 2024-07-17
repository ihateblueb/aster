<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { locale } from '$lib/locale';

	import Avatar from '$lib/components/Avatar.svelte';
	import Mfm from '$lib/components/Mfm.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import DropdownItem from '$lib/components/DropdownItem.svelte';
	import Emoji from '$lib/components/Emoji.svelte';

	import noteBookmark from '$lib/api/note/bookmark';
	import noteDelete from '$lib/api/note/delete';
	import noteReact from '$lib/api/note/react';
	import noteLike from '$lib/api/note/like';
	import noteRepeat from '$lib/api/note/repeat';
	import notePin from '$lib/api/note/pin';
	import noteUnpin from '$lib/api/note/unpin';

	import userBite from '$lib/api/user/bite';

	export let data;
	export let pinned: boolean = false;
	export let repeated: boolean = false;
	export let repeatedBy: string = '';
	export let detailed: boolean = false;
	export let inTimeline: boolean = false;

	let cwOpen = false;

	let more: Dropdown;

	import InstanceTicker from './InstanceTicker.svelte';
	import NoteMedia from './NoteMedia.svelte';
	import Time from './Time.svelte';
</script>

<template>
	<article class={'note _qM1880w' + (inTimeline ? ' inTimeline' : '')}>
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
				<a
					href={'/@' + data.author.username + '@' + data.author.host}
					class="displayname subtle"
				>
					<Avatar
						src={data.author.avatar}
						alt={data.author.avatar_alt}
						isCat={data.author.is_cat}
						size="45px"
					/></a
				>
				<div class="names">
					<a
						href={'/@' +
							data.author.username +
							'@' +
							data.author.host}
						class="displayname subtle"
						><Mfm content={data.author.displayname} simple /></a
					>
					<a
						href={'/@' +
							data.author.username +
							'@' +
							data.author.host}
						class="username subtle"
						>@{data.author.username}{#if !data.author.local}
							<span class="host">@{data.author.host}</span>
						{/if}</a
					>
				</div>
			</div>
			<div class="right">
				<div class="top">
					<Time time={data.created_at} />
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
				{#if data.instance}
					<InstanceTicker data={data.instance} />
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
						<button on:click={() => (cwOpen = !cwOpen)}>
							{#if cwOpen}
								{locale('close')}
							{:else}
								{locale('open')}
							{/if}
						</button>
					</div>
				</div>
				{#if cwOpen}
					<div style={detailed ? null : 'cursor: pointer;'}>
						<Mfm
							content={data.content}
							emojis={data.emojis}
							on:click={() => {
								if (!detailed) goto('/notes/' + data.id);
							}}
						/>
						<NoteMedia attachments={data.attachments} />
					</div>
				{/if}
			{:else}
				<div style={detailed ? null : 'cursor: pointer;'}>
					<Mfm
						content={data.content}
						emojis={data.emojis}
						on:click={() => {
							if (!detailed) goto('/notes/' + data.id);
						}}
					/>

					<NoteMedia attachments={data.attachments} />
				</div>
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

		{#if data.reactions}
			<div class="reactions">
				{#each data.reactions as reaction}
					<div class="reaction">
						<Emoji data={reaction} />
						{reaction.count}
					</div>
				{/each}
			</div>
		{/if}

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
				<button on:click={() => noteLike(data.id)}>
					<Icon name="star" size="20px" color="inherit" />
					<span>{data.likes.count}</span>
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
		<DropdownItem
			on:click={() =>
				navigator.clipboard.writeText(
					$page.url.protocol +
						'//' +
						$page.url.host +
						'/notes/' +
						data.id
				)}
		>
			<Icon size="18px" name="link" margin="0px 8px 0px 0px" />
			<span>{locale('copy_link')}</span>
		</DropdownItem>
		{#if !data.local}
			<DropdownItem
				on:click={() => navigator.clipboard.writeText(data.ap_id)}
			>
				<Icon size="18px" name="link" margin="0px 8px 0px 0px" />
				<span>{locale('copy_link_origin')}</span>
			</DropdownItem>
			<DropdownItem on:click={() => (window.location.href = data.ap_id)}>
				<Icon
					size="18px"
					name="external-link"
					margin="0px 8px 0px 0px"
				/>
				<span>{locale('view_on_remote')}</span>
			</DropdownItem>
			<hr />
		{/if}
		<DropdownItem
			on:click={() => navigator.clipboard.writeText(data.content)}
		>
			<Icon size="18px" name="copy" margin="0px 8px 0px 0px" />
			<span>{locale('copy_content')}</span>
		</DropdownItem>
		<DropdownItem on:click={() => navigator.clipboard.writeText(data.id)}>
			<Icon size="18px" name="copy" margin="0px 8px 0px 0px" />
			<span>{locale('copy_note_id')}</span>
		</DropdownItem>
		<DropdownItem
			on:click={() => navigator.clipboard.writeText(data.author.id)}
		>
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
