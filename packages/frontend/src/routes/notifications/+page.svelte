<script>
	import { locale } from '$lib/locale';

	import PageHeader from '$lib/components/PageHeader.svelte';

	import notificationsGet from '$lib/api/notifications/get';
	import Notification from '$lib/components/Notification.svelte';
	import Button from '$lib/components/Button.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Tab from '$lib/components/Tab.svelte';

	let timeline = 'all';
</script>

<template>
	<PageHeader title={locale('notifications')} icon="bell">
		<Tab
			icon="bell"
			label={locale('all')}
			selected={timeline === 'all' ? true : false}
			on:click={async () => {
				timeline = 'all';
			}}
		/>
		<Tab
			icon="at"
			label={locale('mentions')}
			selected={timeline === 'mentions' ? true : false}
			on:click={async () => {
				timeline = 'mentions';
			}}
		/>
		<Tab
			icon="mail"
			label={locale('direct')}
			selected={timeline === 'direct' ? true : false}
			on:click={async () => {
				timeline = 'direct';
			}}
		/>
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
