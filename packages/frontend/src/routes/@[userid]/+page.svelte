<script lang="ts">
	import { locale } from '$lib/locale';
	import localstore from '$lib/utils/localstore'

	import PageHeader from '$lib/components/PageHeader.svelte';
	import Avatar from '$lib/components/Avatar.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import DropdownItem from '$lib/components/DropdownItem.svelte';
	import Mfm from '$lib/components/Mfm.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Note from '$lib/components/Note.svelte';

	import noteGet from '$lib/api/note/get';
	import Button from '$lib/components/Button.svelte';
	import userFollow from '$lib/api/user/follow.js';
	import userBite from '$lib/api/user/bite.js';
	import { goto } from '$app/navigation';
	import timelineUserGet from '$lib/api/timeline/user/get.js';
	import updateAccount from '$lib/api/user/update.js';

	export let data;

	if (!data.banner) {
		data.banner =
			'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiPjwvc3ZnPg==';
	}

	let more: Dropdown;
</script>

<template>
	{#key data}
		{#if data}
			{#if data.message}
				<PageHeader title={data.message} icon="user" />
			{:else if data.local}
				<PageHeader
					title="{data.displayname
						? data.displayname
						: data.username} (@{data.username})"
					icon="user"
				>
					<Avatar
						slot="icon"
						src={data.avatar}
						alt={data.avatar_alt}
						isCat={data.is_cat}
						size="18px"
						small
					/>

					<Button type="header" on:click={(e) => more.open(e)}>
						<Icon name="dots" size="18px" />
					</Button>
				</PageHeader>
			{:else if !data.local}
				<PageHeader
					title="{data.displayname
						? data.displayname
						: data.username} (@{data.username}@{data.host})"
					icon="user"
				>
					<Avatar
						slot="icon"
						src={data.avatar}
						alt={data.avatar_alt}
						isCat={data.is_cat}
						size="18px"
						small
					/>

					<Button type="header" on:click={(e) => more.open(e)}>
						<Icon name="dots" size="18px" />
					</Button>
				</PageHeader>
			{/if}
		{:else}
			<PageHeader
				title={locale('user_not_found')}
				icon="alert-triangle"
			/>
		{/if}

		<Dropdown bind:this={more}>
			<DropdownItem
				on:click={() =>
					navigator.clipboard.writeText(
						'@' + data.username + '@' + data.host
					)}
			>
				<Icon size="18px" name="at" margin="0px 8px 0px 0px" />
				<span>{locale('copy_username')}</span>
			</DropdownItem>
			<DropdownItem
				on:click={() => navigator.clipboard.writeText(data.id)}
			>
				<Icon size="18px" name="copy" margin="0px 8px 0px 0px" />
				<span>{locale('copy_user_id')}</span>
			</DropdownItem>
			<hr />
			<DropdownItem on:click={() => userBite(data.id)}>
				<Icon size="18px" name="dental" margin="0px 8px 0px 0px" />
				<span>{locale('bite_user')}</span>
			</DropdownItem>
			<hr />
			<DropdownItem>
				<Icon
					size="18px"
					name="exclamation-circle"
					margin="0px 8px 0px 0px"
				/>
				<span>{locale('report_user')}</span>
			</DropdownItem>
			<DropdownItem>
				<Icon size="18px" name="eye-off" margin="0px 8px 0px 0px" />
				<span>{locale('mute_user')}</span>
			</DropdownItem>
			<DropdownItem>
				<Icon size="18px" name="repeat-off" margin="0px 8px 0px 0px" />
				<span>{locale('mute_repeats')}</span>
			</DropdownItem>
			<DropdownItem>
				<Icon size="18px" name="ban" margin="0px 8px 0px 0px" />
				<span>{locale('block_user')}</span>
			</DropdownItem>
			<hr />
			{#if !data.local}
				<DropdownItem
					on:click={() => window.open(data.ap_id, '_blank')}
				>
					<Icon
						size="18px"
						name="external-link"
						margin="0px 8px 0px 0px"
					/>
					<span>{locale('view_on_remote')}</span>
				</DropdownItem>
			{/if}
			<DropdownItem
				on:click={() =>
					goto('@' + data.username + '@' + data.host + '/raw')}
			>
				<Icon size="18px" name="code" margin="0px 8px 0px 0px" />
				<span>{locale('view_raw')}</span>
			</DropdownItem>
			<hr />
			<DropdownItem on:click={() => updateAccount(data.id)}>
				<Icon size="18px" name="refresh" margin="0px 8px 0px 0px" />
				<span>{locale('remote_refresh_user')}</span>
			</DropdownItem>
		</Dropdown>

		<div class="pageContent">
			{#if data}
				{#if data.message}
					<div class="paddedPage">
						{data.message}
					</div>
				{:else}
					<div class="userHeader">
						<img class="banner" src={data.banner} />
						<div class="innerHeader">
							<div class="top">
								<div class="left">
									<Avatar
										src={data.avatar}
										alt={data.avatar_alt}
										isCat={data.is_cat}
										size="65px"
									/>

									<div class="name">
										<span class="displayname">
											<Mfm
												content={data.displayname
													? data.displayname
													: data.username}
												simple
											/>
											<div class="indicators">
												{#if data.locked}
													<Icon
														name="lock"
														size="18px"
														color="var(--txt-tertiary)"
														title={locale(
															'locked_long'
														)}
													/>
												{/if}
												{#if data.automated}
													<Icon
														name="robot"
														size="18px"
														color="var(--txt-tertiary)"
														title={locale(
															'automated_long'
														)}
													/>
												{/if}
											</div>
										</span>
										<span class="username"
											>@{data.username}{#if !data.local}@{data.host}{/if}</span
										>
									</div>
								</div>
								<div class="right">
									{#if data.id !== (localstore.get('account') ? JSON.parse(localstore.get('account')).id : '')}
										<Button on:click={() => userFollow(data.id)}>{locale('follow')}</Button>
										{:else}
										<Button to="/settings/profile">{locale('edit_profile')}</Button>
									{/if}
								</div>
							</div>
							<p class="bio">
								{#if data.bio}
									<Mfm content={data.bio} />
								{:else}
									<p class="nobio">{locale('no_bio')}</p>
								{/if}
							</p>
							{#if data.location}
								<p class="location">
									<Icon
										name="map-pin"
										size="16px"
										title={locale('location')}
									/>
									{data.location}
								</p>
							{/if}
							{#if data.birthday}
								<p class="birthday">
									<Icon
										name="cake"
										size="16px"
										title={locale('birthday')}
									/>
									{new Date(data.birthday).toLocaleDateString(
										undefined,
										{
											weekday: 'long',
											month: 'long',
											day: 'numeric',
											year: 'numeric'
										}
									)}
								</p>
							{/if}
							<p class="joined">
								{locale('joined_on')}
								{new Date(data.created_at).toLocaleTimeString(
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
							</p>
							<div class="stats">
								<div>
									<b>{data.total_notes}</b> notes
								</div>
								<div>
									<b>{data.total_following}</b> following
								</div>
								<div>
									<b>{data.total_followers}</b> followers
								</div>
							</div>
						</div>
					</div>
					<div>
						{#if data.pinned_notes && data.pinned_notes.length > 0}
							{#each data.pinned_notes as noteId}
								{#await noteGet(noteId) then note}
									<Note
										data={note}
										pinned
									/>
								{/await}
							{/each}
							<hr />
						{/if}
						{#await timelineUserGet(data.id) then notes}
							{#each notes as note}
								{#if note.type === 'note'}
									<Note data={note.object} />
								{:else if note.type === 'repeat'}
									<Note
										data={note.object.note}
										repeat
										repeatData={note.object}
									/>
								{/if}
							{/each}
						{/await}
					</div>
				{/if}
			{:else}
				<h1>{locale('user_not_found')}</h1>
			{/if}
		</div>
	{/key}
</template>
