<script>
	import { page } from '$app/stores';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Avatar from '$lib/components/Avatar.svelte';
	import Mfm from '$lib/components/Mfm.svelte';
	import Icon from '$lib/components/Icon.svelte';

	export let data;
</script>

<svelte:head>
	{#if data.local}
		<title>{data.displayname} (@{data.username})</title>
	{:else}
		<title>{data.displayname} (@{data.username}@{data.host})</title>
	{/if}
</svelte:head>

<template>
	{#if data.local}
		<PageHeader title="{data.displayname} (@{data.username})" />
	{:else}
		<PageHeader title="{data.displayname} (@{data.username}@{data.host})" />
	{/if}
	<div class="pageContent">
		{#if data}
			<div class="userHeader">
				<img class="banner" src={data.banner} />
				<div class="innerHeader">
					<Avatar {data} size="75px" />
					<div class="name">
						<span class="displayname">
							<Mfm content={data.displayname} />
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
						Joined on {new Date(data.created_at).toLocaleTimeString(
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
				</div>
			</div>
		{:else}
			<h1>User not found</h1>
		{/if}
	</div>
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

			.name {
				margin-bottom: 10px;
				> span {
					display: block;
					margin: 2.5px 0px 2.5px 0px;
					&.displayname {
						display: flex;
						margin-top: 10px;
						font-weight: 700;
						font-size: 18px;
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
	}
</style>
