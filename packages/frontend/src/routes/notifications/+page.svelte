<script>
	import { onMount } from 'svelte';
	import { locale } from '$lib/locale';

	import PageHeader from '$lib/components/PageHeader.svelte';

	import notificationsGet from '$lib/api/notifications/get';
	import Notification from '$lib/components/Notification.svelte';
	import Button from '$lib/components/Button.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Tab from '$lib/components/Tab.svelte';
	import Loading from '$lib/components/Loading.svelte';

	let timeline = 'all';
	let notifications;
	let loadingMore = false;

	async function refresh() {
		notifications = undefined;
		notifications = await notificationsGet(timeline);
	}

	async function fetchMore() {
		console.log(timeline);
		console.log(notifications.at(-1).object.created_at);
		console.log(notifications);

		let newNotifications = await notificationsGet(
			timeline,
			notifications.at(-1).object.created_at
		);
		newNotifications.forEach((e) => {
			notifications = [...notifications, e];
		});

		console.log(notifications);
	}

	onMount(async () => {
		await refresh();
	});

	function actionWhenInViewport(e) {
		const observer = new IntersectionObserver(async (entries) => {
			if (entries[0].isIntersecting) {
				loadingMore = true;
				await fetchMore();
				loadingMore = false;
			}
		});

		observer.observe(e);
	}

	export let data;
</script>

<template>
	<PageHeader title={locale('notifications')} icon="bell">
		<Tab
			icon="bell"
			label={locale('all')}
			selected={timeline === 'all' ? true : false}
			on:click={async () => {
				timeline = 'all';
				await refresh();
			}}
		/>
		<Tab
			icon="at"
			label={locale('mentions')}
			selected={timeline === 'mentions' ? true : false}
			on:click={async () => {
				timeline = 'mentions';
				await refresh();
			}}
		/>
		<Tab
			icon="mail"
			label={locale('direct')}
			selected={timeline === 'direct' ? true : false}
			on:click={async () => {
				timeline = 'direct';
				await refresh();
			}}
		/>
		<hr class="vertical" />
		<Button type="header" on:click={async () => refresh()}>
			<Icon name="refresh" size="16px" />
		</Button>
	</PageHeader>
	<div class="pageContent">
		<div class="paddedPage">
			{#key notifications}
				{#if notifications && notifications.length > 0}
					{#each notifications as notification}
						<Notification data={notification.object} />
					{/each}
					<div use:actionWhenInViewport />
					{#if loadingMore}
						<div class="loading">
							<Loading />
						</div>
					{/if}
				{:else}
					<div class="loading">
						<Loading />
					</div>
				{/if}
			{/key}
		</div>
	</div>
</template>
