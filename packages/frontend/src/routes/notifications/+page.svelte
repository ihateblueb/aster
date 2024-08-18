<script>
	import { locale } from '$lib/locale';

	import PageHeader from '$lib/components/PageHeader.svelte';

	import notificationsGet from '$lib/api/notifications/get';
	import Notification from '$lib/components/Notification.svelte';
	import Button from '$lib/components/Button.svelte';
	import Icon from '$lib/components/Icon.svelte';

	let timeline = 'all';
</script>

<template>
	<PageHeader title={locale('notifications')} icon="bell">
		<Button
			type={'header' + (timeline === 'all' ? ' selected' : '')}
			on:click={async () => {
				timeline = 'all';
			}}
		>
			<Icon name="bell" size="16px" />
		</Button>
		<Button
			type={'header' + (timeline === 'mentions' ? ' selected' : '')}
			on:click={async () => {
				timeline = 'mentions';
			}}
		>
			<Icon name="at" size="16px" />
		</Button>
		<Button
			type={'header' + (timeline === 'direct' ? ' selected' : '')}
			on:click={async () => {
				timeline = 'direct';
			}}
		>
			<Icon name="mail" size="16px" />
		</Button>
		<hr class="vertical" />
		<Button type="header" on:click={async () => refresh()}>
			<Icon name="refresh" size="16px" />
		</Button>
	</PageHeader>
	<div class="pageContent">
		<div class="paddedPage">
			{#await notificationsGet() then notifications}
				{#each notifications as notification}
					<Notification data={notification} />
				{/each}
			{/await}
		</div>
	</div>
</template>
