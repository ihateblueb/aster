<script lang="ts">
	import noteGet from '$lib/api/note/get';
	import { locale } from '$lib/locale';
	import Icon from './Icon.svelte';
	import Note from './Note.svelte';
	import NoteSimple from './NoteSimple.svelte';
	import Time from './Time.svelte';

	export let data;
	export let small: boolean = false;
</script>

<template>
	{#if data && data.to && data.from}
		{#if data.type === 'follow'}
			<div class={'notification _E6Sc553 ' + (small ? 'small' : '')}>
				<div class="header">
					<div class="left">
						<Icon name="user-plus" size="18px" />
					</div>
					<div class="center">
						<p>
							<a
								class="username subtle"
								href={'/@' +
									data.from.username +
									'@' +
									data.from.host}
								>{data.from.displayname}
							</a>
							{locale('followed_you')}
						</p>
					</div>
					<div class="right">
						{#if data.created_at}
							<Time time={data.created_at} />
						{/if}
					</div>
				</div>
			</div>
		{:else if data.type === 'followrequest'}
			<div class={'notification _E6Sc553 ' + (small ? 'small' : '')}>
				<div class="header">
					<div class="left">
						<Icon name="user-question" size="18px" />
					</div>
					<div class="center">
						<p>
							<a
								class="username subtle"
								href={'/@' +
									data.from.username +
									'@' +
									data.from.host}
								>{data.from.displayname}
							</a>
							{locale('requested_to_follow_you')}
						</p>
					</div>
					<div class="right">
						{#if data.created_at}
							<Time time={data.created_at} />
						{/if}
					</div>
				</div>
			</div>
		{:else if data.type === 'like'}
			<div class={'notification _E6Sc553 ' + (small ? 'small' : '')}>
				<div class="header">
					<div class="left">
						<Icon name="star" size="18px" />
					</div>
					<div class="center">
						<p>
							<a
								class="username subtle"
								href={'/@' +
									data.from.username +
									'@' +
									data.from.host}
								>{data.from.displayname}
							</a>
							{locale('liked_your_note')}
						</p>
					</div>
					<div class="right">
						{#if data.created_at}
							<Time time={data.created_at} />
						{/if}
					</div>
				</div>
				{#if data.object}
					<NoteSimple data={data.object} />
				{/if}
			</div>
		{:else if data.type === 'react'}
			<div class={'notification _E6Sc553 ' + (small ? 'small' : '')}>
				<div class="header">
					<div class="left">
						<img height="22px" src={data.reaction.url} />
					</div>
					<div class="center">
						<p>
							<a
								class="username subtle"
								href={'/@' +
									data.from.username +
									'@' +
									data.from.host}
								>{data.from.displayname}
							</a>
							{locale('reacted_to_your_note')}
						</p>
					</div>
					<div class="right">
						{#if data.created_at}
							<Time time={data.created_at} />
						{/if}
					</div>
				</div>
				{#if data.object}
					<NoteSimple data={data.object} />
				{/if}
			</div>
		{:else if data.type === 'repeat'}
			<div class={'notification _E6Sc553 ' + (small ? 'small' : '')}>
				<div class="header">
					<div class="left">
						<Icon name="repeat" size="18px" />
					</div>
					<div class="center">
						<p>
							<a
								class="username subtle"
								href={'/@' +
									data.from.username +
									'@' +
									data.from.host}
								>{data.from.displayname}
							</a>
							{locale('repeated_your_note')}
						</p>
					</div>
					<div class="right">
						{#if data.created_at}
							<Time time={data.created_at} />
						{/if}
					</div>
				</div>
				{#if data.object}
					<NoteSimple data={data.object} />
				{/if}
			</div>
		{:else if data.type === 'mention'}
			<div class={'notification _E6Sc553 ' + (small ? 'small' : '')}>
				<div class="header">
					<div class="left">
						<Icon name="at" size="18px" />
					</div>
					<div class="center">
						<p>
							<a
								class="username subtle"
								href={'/@' +
									data.from.username +
									'@' +
									data.from.host}
								>{data.from.displayname}
							</a>
							{locale('mentioned_you_in_a_note')}
						</p>
					</div>
					<div class="right">
						{#if data.created_at}
							<Time time={data.created_at} />
						{/if}
					</div>
				</div>
				{#if data.object}
					<NoteSimple data={data.object} />
				{/if}
			</div>
		{:else}
			<div class={'notification _E6Sc553 ' + (small ? 'small' : '')}>
				<div class="header">
					<div class="left">
						<Icon name="question-mark" size="18px" />
					</div>
					<div class="center">
						<p>
							{locale('unknown_notification')}
							<a
								class="username subtle"
								href={'/@' +
									data.from.username +
									'@' +
									data.from.host}
								>{data.from.displayname}
							</a>
						</p>
					</div>
					<div class="right">
						{#if data.created_at}
							<Time time={data.created_at} />
						{/if}
					</div>
				</div>
				<p>{JSON.stringify(data)}</p>
			</div>
		{/if}
	{/if}
</template>
