<script>
	import { locale } from '$lib/locale';
	import Avatar from './Avatar.svelte';
	import Icon from './Icon.svelte';
	import Mfm from './Mfm.svelte';
	import Time from './Time.svelte';

	// for quotes, notifications
	export let data;
</script>

<template>
	<article class="noteSimple _kN27K8S">
		<div class="header">
			<div class="left">
				<Avatar
					src={data.author.avatar}
					alt={data.author.avatar_alt}
					isCat={data.author.is_cat}
					size="22px"
					small
				/>
				<a
					class="subtle"
					href={'/@' + data.author.username + '@' + data.author.host}
				>
					{#if data.author.displayname}
						<p class="displayname">{data.author.displayname}</p>
					{/if}
					<p class="username">
						@{data.author.username}
						{#if !data.author.local}
							@{data.author.host}
						{/if}
					</p>
				</a>
			</div>
			<div class="right">
				<Time time={data.created_at} />
				{#if data.visibility === 'public'}
					<Icon
						name="planet"
						size="17px"
						color="var(--txt-primary)"
						title={locale('public')}
					/>
				{:else if data.visibility === 'unlisted'}
					<Icon
						name="home"
						size="17px"
						color="var(--txt-primary)"
						title={locale('unlisted')}
					/>
				{:else if data.visibility === 'followers'}
					<Icon
						name="lock"
						size="17px"
						color="var(--txt-primary)"
						title={locale('followers_only')}
					/>
				{:else if data.visibility === 'direct'}
					<Icon
						name="mail"
						size="17px"
						color="var(--txt-primary)"
						title={locale('direct_note')}
					/>
				{/if}
			</div>
		</div>
		<div class="content">
			<Mfm content={data.content} simple />
		</div>
	</article>
</template>
