<script>
	import { page } from '$app/stores';
	import driveFileEdit from '$lib/api/drive/file/edit';
	import driveFileGet from '$lib/api/drive/file/get';
	import Button from '$lib/components/Button.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Input from '$lib/components/Input.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Time from '$lib/components/Time.svelte';
	import { locale } from '$lib/locale';
	import { onMount } from 'svelte';

	let data = {};

	let nameValue = '';
	let altValue = '';

	async function refresh() {
		data = {};
		data = await driveFileGet($page.params.fileid);

		nameValue = data.name;
		altValue = data.alt;
	}

	onMount(async () => {
		data = await driveFileGet($page.params.fileid);

		nameValue = data.name;
		altValue = data.alt;
	});

	let editingName = false;
	let editingAlt = false;
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
						{#if !editingName}
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
								<Button
									on:click={() => {
										editingName = !editingName;
									}}
								>
									<Icon
										name="edit"
										color="var(--txt-tertiary)"
										size="18px"
									/>
								</Button>
							</div>
						{:else}
							<div class="left">
								<Input
									type="tertiary wide"
									placeholder={data.name
										? data.name
										: 'Not provided'}
									bind:value={nameValue}
								/>
							</div>
							<div class="right">
								<Button
									on:click={() => {
										driveFileEdit(data.id, {
											name: nameValue
										}).then((e) => {
											data = e.file;
										});
										editingName = !editingName;
									}}
								>
									<Icon
										name="check"
										color="var(--txt-tertiary)"
										size="18px"
									/>
								</Button>
							</div>
						{/if}
					</div>
					<div class="info">
						<div class="left">
							<b>Link</b>
							<a href={data.src}>{data.src}</a>
						</div>
					</div>
					<div class="info">
						<div class="left">
							<b>{locale('type')}</b>
							<span>{data.type}</span>
						</div>
					</div>
					<div class="info">
						<div class="left">
							<b>{locale('created_at')}</b>
							<span>{data.created_at}</span>
							(<Time time={data.created_at} />)
						</div>
					</div>
					<div class="info">
						<div class="left">
							<b>{locale('updated_at')}</b>
							<span>{data.updated_at}</span>
							(<Time time={data.updated_at} />)
						</div>
					</div>
					<div class="info">
						{#if !editingAlt}
							<div class="left">
								<b>{locale('alt_text')}</b>
								{#if data.alt}
									<span>{data.alt} </span>
								{:else}
									<span class="notProvided"
										>{locale('not_provided')}</span
									>
								{/if}
							</div>
							<div class="right">
								<Button
									on:click={() => {
										editingAlt = !editingAlt;
									}}
								>
									<Icon
										name="edit"
										color="var(--txt-tertiary)"
										size="18px"
									/>
								</Button>
							</div>
						{:else}
							<div class="left">
								<Input
									type="tertiary wide"
									placeholder={data.alt
										? data.alt
										: 'Not provided'}
									bind:value={altValue}
								/>
							</div>
							<div class="right">
								<Button
									on:click={() => {
										driveFileEdit(data.id, {
											alt_text: altValue
										}).then((e) => {
											data = e.file;
										});
										editingAlt = !editingAlt;
									}}
								>
									<Icon
										name="check"
										color="var(--txt-tertiary)"
										size="18px"
									/>
								</Button>
							</div>
						{/if}
					</div>
					<hr />
					<div class="actions">
						<div class="left">
							<Button>
								<Icon
									name="user-circle"
									size="18px"
									margin="0px 6px 0px 0px"
								/>
								{locale('set_avatar')}
							</Button>
							<Button>
								<Icon
									name="photo"
									size="18px"
									margin="0px 6px 0px 0px"
								/>
								{locale('set_banner')}
							</Button>
							<Button>
								<Icon
									name="background"
									size="18px"
									margin="0px 6px 0px 0px"
								/>
								{locale('set_background')}
							</Button>
						</div>
						<div class="right">
							<Button type="danger">
								<Icon
									name="trash"
									size="18px"
									margin="0px 6px 0px 0px"
								/>
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
			gap: 15px;

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
			width: calc(100% - 12px);
			margin-left: 6px;
			margin-right: 6px;
			margin-top: 12px;
			margin-bottom: 12px;
			border: 0px solid;
			border-top: var(--border-width-s) solid var(--bg-accent);
		}

		.actions {
			display: flex;
			gap: 5px;

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
