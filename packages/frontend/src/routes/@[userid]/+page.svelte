<script lang="ts">
	import { page } from '$app/stores';
	import { locale } from '$lib/locale';

	import PageHeader from '$lib/components/PageHeader.svelte';
	import Avatar from '$lib/components/Avatar.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import DropdownItem from '$lib/components/DropdownItem.svelte';
	import Mfm from '$lib/components/Mfm.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Note from '$lib/components/Note.svelte';

	import noteGet from '$lib/api/note/get';
	import Button from '$lib/components/Button.svelte';

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
			<DropdownItem>
				<Icon size="18px" name="copy" margin="0px 8px 0px 0px" />
				<span>{locale('copy_username')}</span>
			</DropdownItem>
			<DropdownItem>
				<Icon size="18px" name="copy" margin="0px 8px 0px 0px" />
				<span>{locale('copy_user_id')}</span>
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
			<DropdownItem>
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
										size="75px"
									/>
								</div>
								<div class="right">
									<Button>Follow</Button>
								</div>
							</div>
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
												title={locale('locked_long')}
											/>
										{/if}
										{#if data.automated}
											<Icon
												name="robot"
												size="18px"
												color="var(--txt-tertiary)"
												title={locale('automated_long')}
											/>
										{/if}
									</div>
								</span>
								<span class="username"
									>@{data.username}{#if !data.local}@{data.host}{/if}</span
								>
							</div>
							<p class="bio">
								{#if data.bio}
									<Mfm content={data.bio} />
								{:else}
									<p class="nobio">{locale('no_bio')}</p>
								{/if}
							</p>
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
									<b>0</b> notes
								</div>
								<div>
									<b>0</b> following
								</div>
								<div>
									<b>0</b> followers
								</div>
							</div>
						</div>
					</div>
					<div>
						{#if data.pinned_notes}
							{#each data.pinned_notes as noteId}
								{#await noteGet(noteId) then note}
									<Note
										data={note}
										pinned
										pinnedBy={data.displayname}
									/>
								{/await}
							{/each}
						{/if}
					</div>
				{/if}
			{:else}
				<h1>{locale('user_not_found')}</h1>
			{/if}
		</div>
	{/key}
</template>

<style lang="scss">
	.userHeader {
		.banner {
			height: 200px;
			width: 100%;
			object-fit: cover;
			background-color: var(--bg-secondary);
			user-select: none;
		}
		.innerHeader {
			padding: 12px 16px;
			margin-top: -45px;
			border-bottom: var(--border-width-s) solid var(--bg-tertiary);

			.top {
				width: 100%;
				display: flex;

				.left {
					display: flex;
					flex-grow: 2;
				}

				.right {
					display: flex;
					align-items: center;
					padding-top: 40px;
					gap: 10px;
				}
			}
			.name {
				margin-bottom: 10px;
				> span {
					display: block;
					margin: 2.5px 0px 2.5px 0px;
					&.displayname {
						display: flex;
						margin-top: 10px;
						font-weight: 700;
						font-size: var(--font-xl);
						> .indicators {
							margin-left: 5px;
						}
					}
				}
			}

			.bio,
			.joined {
				margin: 5px 0px 5px 0px;
			}

			.bio {
				line-height: var(--font-xxl);

				.nobio {
					color: var(--txt-tertiary);
					opacity: 75%;
				}
			}

			.joined {
				color: var(--txt-tertiary);
			}
		}
		.stats {
			display: flex;
			gap: 10px;
			width: 100%;
		}
	}
</style>
