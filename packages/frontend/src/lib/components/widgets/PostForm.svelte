<script lang="ts">
	import { locale } from '$lib/locale';

	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import DropdownItem from '$lib/components/DropdownItem.svelte';

	import noteCreate from '$lib/api/note/create';
	import Icon from '../Icon.svelte';
	import Avatar from '../Avatar.svelte';
	import Store from '$lib/utils/Store';
	import Mfm from '../Mfm.svelte';

	let noteCw = '';
	let noteContent = '';

	let selectedVisibility = 'public';
	let showPreview = false;
	let showCw = false;

	let account = Store.get('account');
	if (account) {
		account = JSON.parse(account);
	}

	let visibility: Dropdown;
</script>

<template>
	<div class="formHeader">
		<div class="left">
			<div>
				<Avatar
					src={account.avatar}
					alt={account.avatar_alt}
					isCat={account.is_cat}
					size="34px"
				/>
			</div>
		</div>
		<div class="right">
			<Button on:click={(e) => visibility.open(e)}>
				{#key selectedVisibility}
					{#if selectedVisibility === 'public'}
						<Icon
							name="planet"
							size="18px"
							title={locale('public')}
						/>
					{:else if selectedVisibility === 'unlisted'}
						<Icon
							name="home"
							size="18px"
							title={locale('unlisted')}
						/>
					{:else if selectedVisibility === 'followers'}
						<Icon
							name="lock"
							size="18px"
							title={locale('followers_only')}
						/>
					{:else if selectedVisibility === 'direct'}
						<Icon
							name="mail"
							size="18px"
							title={locale('direct_note')}
						/>
					{/if}
				{/key}
			</Button>
		</div>
	</div>
	{#if showCw}
		<Input type="wide" placeholder={locale('cw')} bind:value={noteCw}
		></Input>
	{/if}
	<Input
		type="wide"
		big
		placeholder={locale('whats_on_your_mind')}
		bind:value={noteContent}
	></Input>
	{#if showPreview}
		<div class="notePreview">
			{#key noteContent}
				<Mfm content={noteContent} />
			{/key}
		</div>
	{/if}
	<div class="formFooter">
		<div class="left">
			<Button on:click={() => (showPreview = !showPreview)}>
				<Icon
					name={showPreview ? 'eye-off' : 'eye'}
					size="18px"
					title={locale('show_preview')}
				/>
			</Button>
			<Button on:click={() => (showCw = !showCw)}>
				<Icon
					name="alert-triangle"
					size="18px"
					title={locale('direct_note')}
				/>
			</Button>
		</div>
		<div class="right">
			<Button
				on:click={() =>
					noteCreate(noteCw, noteContent, selectedVisibility)}
			>
				{locale('note')}
			</Button>
		</div>
	</div>

	<Dropdown bind:this={visibility}>
		<DropdownItem on:click={() => (selectedVisibility = 'public')}>
			<div class="visibilityItem">
				<div class="top">
					<Icon size="18px" name="planet" margin="0px 8px 0px 0px" />
					<span>{locale('public')}</span>
				</div>
				<div class="bottom">
					<small>{locale('public_desc')}</small>
				</div>
			</div>
		</DropdownItem>
		<DropdownItem on:click={() => (selectedVisibility = 'unlisted')}>
			<div class="visibilityItem">
				<div class="top">
					<Icon size="18px" name="home" margin="0px 8px 0px 0px" />
					<span>{locale('unlisted')}</span>
				</div>
				<div class="bottom">
					<small>{locale('unlisted_desc')}</small>
				</div>
			</div>
		</DropdownItem>
		<DropdownItem on:click={() => (selectedVisibility = 'followers')}>
			<div class="visibilityItem">
				<div class="top">
					<Icon size="18px" name="lock" margin="0px 8px 0px 0px" />
					<span>{locale('followers_only')}</span>
				</div>
				<div class="bottom">
					<small>{locale('followers_only_desc')}</small>
				</div>
			</div>
		</DropdownItem>
		<DropdownItem on:click={() => (selectedVisibility = 'direct')}>
			<div class="visibilityItem">
				<div class="top">
					<Icon size="18px" name="mail" margin="0px 8px 0px 0px" />
					<span>{locale('direct_note')}</span>
				</div>
				<div class="bottom">
					<small>{locale('direct_note_desc')}</small>
				</div>
			</div>
		</DropdownItem>
	</Dropdown>
</template>

<style lang="scss">
	.formFooter,
	.formHeader {
		display: flex;
		align-items: center;
		width: 100%;

		.left {
			display: flex;
			flex-grow: 10;
			gap: 10px;
		}
		.right {
			display: flex;
			flex-grow: 0;
			gap: 10px;
		}
	}

	.notePreview {
		display: block;
		background-color: var(--bg-accent-50);
		color: var(--txt-secondary);
		font-size: var(--font-m);
		padding: 8px 12px;
		margin: 5px 0;
		border-radius: var(--border-m);
		border: none;
		font-family: inherit;
	}

	.visibilityItem {
		display: block;
		text-align: left;
		max-width: 250px;

		.top {
			display: flex;
			align-items: center;
		}
		.bottom {
			display: block;
			opacity: 75%;
			padding-left: 28px;
		}
	}
</style>
