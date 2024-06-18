<script>
	import { page } from '$app/stores';
	import { locale } from '$lib/locale';

	import PageHeader from '$lib/components/PageHeader.svelte';
	import Avatar from '$lib/components/Avatar.svelte';
	import Mfm from '$lib/components/Mfm.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Note from '$lib/components/Note.svelte';

	import noteGet from '$lib/api/note/get';

	export let data;
</script>

<template>
	{#key data}
		{#if data}
			{#if data.message}
				<PageHeader title={data.message} />
			{:else if data.local}
				<PageHeader title="{data.displayname} (@{data.username})" />
			{:else if !data.local}
				<PageHeader
					title="{data.displayname} (@{data.username}@{data.host})"
				/>
			{/if}
		{:else}
			<PageHeader title={locale('user_not_found')} />
		{/if}
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
							<Avatar {data} size="75px" />
							<div class="name">
								<span class="displayname">
									<Mfm content={data.displayname} simple />
									<div class="indicators">
										{#if data.locked}
											<Icon
												name="lock"
												size="18px"
												color="var(--txt-tertiary)"
											/>
										{/if}
										{#if data.automated}
											<Icon
												name="robot"
												size="18px"
												color="var(--txt-tertiary)"
											/>
										{/if}
									</div>
								</span>
								<span class="username"
									>@{data.username}{#if !data.local}@{data.host}{/if}</span
								>
							</div>
							<p class="bio">
								<Mfm content={data.bio} />
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
