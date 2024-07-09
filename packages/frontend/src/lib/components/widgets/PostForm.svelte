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

	let noteCw = '';
	let noteContent = '';

	let selectedVisibility = 'public';
	let showCw = false;

	var account = Store.get('account');

	let visibility: Dropdown;
</script>

<template>
	<div class="formHeader">
		<div class="left">
			<Avatar
				src={account.avatar}
				alt={account.avatar_alt}
				isCat={account.is_cat}
				size="34px"
			/>
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
	<div class="formFooter">
		<div class="left">
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
</template>

<style lang="scss">
	.formFooter,
	.formHeader {
		display: flex;
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
