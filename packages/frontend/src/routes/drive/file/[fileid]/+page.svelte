<script>
	import { page } from '$app/stores';
	import driveFileGet from '$lib/api/drive/file/get';
	import Button from '$lib/components/Button.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Time from '$lib/components/Time.svelte';
	import { locale } from '$lib/locale';
	import { onMount } from 'svelte';

	let data = {};

	async function refresh() {
		data = {};
		data = await driveFileGet($page.params.fileid);
	}

	onMount(async () => {
		data = await driveFileGet($page.params.fileid);
	});
</script>

<template>
	<PageHeader
		title={locale('drive') + ' / ' + $page.params.fileid}
		icon="file"
	>
		<Button
			type="header"
			on:click={() => {
				refresh();
			}}
		>
			<Icon name="refresh" size="16px" />
		</Button>
	</PageHeader>

	<div class="pageContent">
		<div class="paddedPage">
			{#key data}
				<div class="file">
					<img src={data.src} alt={data.alt} title={data.alt} />
					<div class="info">
						<div class="left">
							<b>Name</b>
							{#if data.name}
								<span>{data.name}</span>
							{:else}
								<span class="notProvided"
									>{locale('not_provided')}</span
								>
							{/if}
						</div>
						<div class="right">
							<Button>
								<Icon
									name="edit"
									color="var(--txt-tertiary)"
									size="18px"
								/>
							</Button>
						</div>
					</div>
					<div class="info">
						<div class="left">
							<b>Link</b>
							<a href={data.src}>{data.src}</a>
						</div>
					</div>
					<div class="info">
						<div class="left">
							<b>Type</b>
							<span>{data.type}</span>
						</div>
					</div>
					<div class="info">
						<div class="left">
							<b>Created at</b>
							<span>{data.created_at}</span>
							(<Time time={data.created_at} />)
						</div>
					</div>
					<div class="info">
						<div class="left">
							<b>Updated at</b>
							<span>{data.updated_at}</span>
							(<Time time={data.updated_at} />)
						</div>
					</div>
					<div class="info">
						<div class="left">
							<b> Alt text </b>
							{#if data.alt}
								<span>{data.alt} </span>
							{:else}
								<span class="notProvided"
									>{locale('not_provided')}</span
								>
							{/if}
						</div>
						<div class="right">
							<Button>
								<Icon
									name="edit"
									color="var(--txt-tertiary)"
									size="18px"
								/>
							</Button>
						</div>
					</div>
					<hr />
					<div class="actions">
						<div class="left">
							<Button>
								{locale('set_avatar')}
							</Button>
							<Button>
								{locale('set_banner')}
							</Button>
							<Button>
								{locale('set_background')}
							</Button>
						</div>
						<div class="right">
							<Button type="danger">
								{locale('delete')}
							</Button>
						</div>
					</div>
				</div>
			{/key}
		</div>
	</div>
</template>

<style lang="scss">
	.file {
		padding: 20px;
		border-radius: var(--border-xl);
		background-color: var(--bg-secondary);
		overflow: clip;

		.info {
			display: flex;
			align-items: center;
			margin-top: 10px;
			margin-bottom: 10px;
			gap: 5px;

			b {
				display: block;
			}

			.left {
				flex-grow: 2;
			}
		}

		img {
			width: 100%;
			max-height: 350px;
			object-fit: contain;
		}

		hr {
			width: 100%;
			margin-left: 8px;
			margin-right: 8px;
			margin-top: 12px;
			margin-bottom: 12px;
			border: 0px solid;
			border-top: var(--border-width-s) solid var(--bg-accent);
		}

		.actions {
			display: flex;

			.left {
				flex-grow: 2;
			}

			.right {
				flex-grow: 0;
			}
		}
	}

	.notProvided {
		color: var(--txt-tertiary);
	}
</style>
