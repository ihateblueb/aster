<script lang="ts">
	import { locale } from '$lib/locale';

	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import DropdownItem from '$lib/components/DropdownItem.svelte';

	import noteCreate from '$lib/api/note/create';
	import Icon from '../Icon.svelte';

	let noteCw = '';
	let noteContent = '';

	let selectedVisibility = 'public';
	let showCw = false;

	let visibility: Dropdown;
</script>

<template>
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
					<span>Public</span>
				</div>
				<div class="bottom">
					<small> Visible on the global and local timelines.</small>
				</div>
			</div>
		</DropdownItem>
		<DropdownItem on:click={() => (selectedVisibility = 'unlisted')}>
			<div class="visibilityItem">
				<div class="top">
					<Icon size="18px" name="home" margin="0px 8px 0px 0px" />
					<span>Unlisted</span>
				</div>
				<div class="bottom">
					<small
						>Public, but not visible on the global or local
						timelines.</small
					>
				</div>
			</div>
		</DropdownItem>
		<DropdownItem on:click={() => (selectedVisibility = 'followers')}>
			<div class="visibilityItem">
				<div class="top">
					<Icon size="18px" name="lock" margin="0px 8px 0px 0px" />
					<span>Followers Only</span>
				</div>
				<div class="bottom">
					<small> Only visible to your followers.</small>
				</div>
			</div>
		</DropdownItem>
		<DropdownItem on:click={() => (selectedVisibility = 'direct')}>
			<div class="visibilityItem">
				<div class="top">
					<Icon size="18px" name="mail" margin="0px 8px 0px 0px" />
					<span>Direct Message</span>
				</div>
				<div class="bottom">
					<small> Only visible to people you mention.</small>
				</div>
			</div>
		</DropdownItem>
	</Dropdown>
</template>

<style lang="scss">
	.formFooter {
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
