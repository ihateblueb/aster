<script>
	import { locale } from '$lib/locale';
	import Icon from './Icon.svelte';

	export let data;
</script>

<template>
	{#if data.type === 'follow'}
		<div class="notification _E6Sc553">
			<div class="header">
				<Icon name="user-plus" size="18px" />
				<b>{data.from} {locale('followed_you')}</b>
			</div>
			<p>{JSON.stringify(data)}</p>
		</div>
	{:else if data.type === 'like'}
		<div class="notification _E6Sc553">
			<div class="header">
				<Icon name="star" size="18px" />
				<b>{data.from} {locale('liked_your_note')}</b>
			</div>
			<p>{JSON.stringify(data)}</p>
		</div>
	{:else}
		<div class="notification _E6Sc553">
			<div class="header">
				<Icon name="question-mark" size="18px" />
				<b>{locale('unknown_notification')} {data.from}</b>
			</div>
			<p>{JSON.stringify(data)}</p>
		</div>
	{/if}
</template>
