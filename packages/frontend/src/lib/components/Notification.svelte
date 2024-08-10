<script>
	import noteGet from '$lib/api/note/get';
	import { locale } from '$lib/locale';
	import Icon from './Icon.svelte';
	import Note from './Note.svelte';
	import Time from './Time.svelte';

	export let data;
</script>

<template>
	{#if data && data.to && data.from}
		{#if data.type === 'follow'}
			<div class="notification _E6Sc553">
				<div class="header">
					<Icon name="user-plus" size="18px" />
					<b>
						<a
							class="subtle"
							href={'/@' +
								data.from.username +
								'@' +
								data.from.host}
							>{data.from.displayname}
						</a>
						{locale('followed_you')}
					</b>
					{#if data.created_at}
						<Time time={data.created_at} />
					{/if}
				</div>
			</div>
		{:else if data.type === 'like'}
			<div class="notification _E6Sc553">
				<div class="header">
					<Icon name="star" size="18px" />
					<b>
						<a
							class="subtle"
							href={'/@' +
								data.from.username +
								'@' +
								data.from.host}
							>{data.from.displayname}
						</a>
						{locale('liked_your_note')}
					</b>
					{#if data.created_at}
						<Time time={data.created_at} />
					{/if}
				</div>
				{#await noteGet(data.object) then note}
					<Note data={note} inTimeline />
				{/await}
			</div>
		{:else if data.type === 'react'}
			<div class="notification _E6Sc553">
				<div class="header">
					<img height="22px" src={data.reaction.url} />
					<b>
						<a
							class="subtle"
							href={'/@' +
								data.from.username +
								'@' +
								data.from.host}
							>{data.from.displayname}
						</a>
						{locale('reacted_to_your_note')}
					</b>
					{#if data.created_at}
						<Time time={data.created_at} />
					{/if}
				</div>
				{#await noteGet(data.object) then note}
					<Note data={note} inTimeline />
				{/await}
			</div>
		{:else}
			<div class="notification _E6Sc553">
				<div class="header">
					<Icon name="question-mark" size="18px" />
					<b>
						{locale('unknown_notification')}
						<a
							class="subtle"
							href={'/@' +
								data.from.username +
								'@' +
								data.from.host}
							>{data.from.displayname}
						</a>
					</b>
					{#if data.created_at}
						<Time time={data.created_at} />
					{/if}
				</div>
				<p>{JSON.stringify(data)}</p>
			</div>
		{/if}
	{/if}
</template>
