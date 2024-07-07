<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { locale } from '$lib/locale';

	import Avatar from '$lib/components/Avatar.svelte';
	import Mfm from '$lib/components/Mfm.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import DropdownItem from '$lib/components/DropdownItem.svelte';
	import Emoji from '$lib/components/Emoji.svelte';

	import noteBookmark from '$lib/api/note/bookmark';
	import noteDelete from '$lib/api/note/delete';
	import noteReact from '$lib/api/note/react';
	import noteRepeat from '$lib/api/note/repeat';
	import notePin from '$lib/api/note/pin';
	import noteUnpin from '$lib/api/note/unpin';

	import userBite from '$lib/api/user/bite';

	export let data;
	export let pinned: boolean = false;
	export let repeated: boolean = false;
	export let repeatedBy: string = '';
	export let detailed: boolean = false;

	let cwOpen = false;
	let timer = 0;

	function toggleCw() {
		if (cwOpen) {
			cwOpen = false;
		} else if (!cwOpen) {
			cwOpen = true;
		}
	}

	function timeAgo(time) {
		// TODO: rewrite this. it sucks. its stolen from masto-aster

		switch (typeof time) {
			case 'number':
				break;
			case 'string':
				time = +new Date(time);
				break;
			case 'object':
				if (time.constructor === Date) time = time.getTime();
				break;
			default:
				time = +new Date();
		}
		var time_formats = [
			[60, 's', 1],
			[120, '1m', '1m'],
			[3600, 'm', 60],
			[7200, '1h', '1h'],
			[86400, 'h', 3600],
			[604800, 'd', 86400],
			[2419200, 'w', 604800],
			[29030400, 'mo', 2419200],
			[2903040000, 'y', 29030400],
			[58060800000, 'c', 2903040000]
		];
		var seconds = (+new Date() - time) / 1000,
			list_choice = 1;
		if (seconds === 0) {
			return 'now';
		}
		var i = 0,
			format;
		while ((format = time_formats[i++]))
			if (seconds < format[0]) {
				if (typeof format[2] == 'string') return format[list_choice];
				else return Math.floor(seconds / format[2]) + format[1];
			}
		return time;
	}

	timer = setInterval(() => {
		timer += 1;
	}, 5000);

	let more: Dropdown;

	import Lightbox from '../../../node_modules/photoswipe/dist/photoswipe-lightbox.esm.js';
	import PhotoSwipe from '../../../node_modules/photoswipe/dist/photoswipe.esm.js';

	onMount(() => {
		let options = {
			gallery: '#gallery',
			children: 'a',
			showHideAnimationType: 'zoom',
			closeOnVerticalDrag: true,
			escKey: true,
			arrowKeys: true,
			errorMsg: locale('media_broken'),
			imageClickAction: 'zoom',
			tapAction: 'zoom',
			initialZoomLevel: 'fill',
			secondaryZoomLevel: 1,
			maxZoomLevel: 2,
			pswpModule: () => PhotoSwipe
		};
		let lightbox = new Lightbox(options);
		lightbox.on('uiRegister', function () {
			lightbox.pswp.ui.registerElement({
				name: 'custom-caption',
				order: 9,
				isButton: false,
				appendTo: 'root',
				html: 'Caption text',
				onInit: (el, pswp) => {
					lightbox.pswp.on('change', () => {
						const currSlideElement =
							lightbox.pswp.currSlide.data.element;
						let captionHTML = '';
						if (currSlideElement) {
							const hiddenCaption =
								currSlideElement.querySelector(
									'.hidden-caption-content'
								);
							if (hiddenCaption) {
								// get caption from element with class hidden-caption-content
								captionHTML = hiddenCaption.innerHTML;
							} else {
								// get caption from alt attribute
								captionHTML = currSlideElement
									.querySelector('img')
									.getAttribute('alt');
							}
						}
						el.innerHTML = captionHTML || '';
					});
				}
			});
		});
		lightbox.init();
	});

	function getHeight(src) {
		let img = new Image();
		img.src = src;
		img.onload = () => {
			console.log(src + ' ' + img.naturalHeight);
			return img.naturalHeight;
		};
	}

	function getWidth(src) {
		let img = new Image();
		img.src = src;
		img.onload = () => {
			console.log(src + ' ' + img.naturalWidth);
			return img.naturalWidth;
		};
	}
</script>

<template>
	<article class="note">
		{#if pinned}
			<div class="notePreheader">
				<Icon
					name="pin"
					size="16px"
					color="var(--txt-tertiary)"
					margin="0px 5px 0px 0px"
				/>
				<span> {locale('note_pinned')} </span>
			</div>
		{/if}
		{#if repeated}
			<div class="notePreheader">
				<Icon
					name="repeat"
					size="16px"
					color="var(--txt-tertiary)"
					margin="0px 5px 0px 0px"
				/>
				<span> {repeatedBy} {locale('repeated')} </span>
			</div>
		{/if}
		<div class="noteHeader">
			<div class="left">
				<a
					href={'/@' + data.author.username + '@' + data.author.host}
					class="displayname subtle"
					><Avatar data={data.author} size="45px" /></a
				>
				<div class="names">
					<a
						href={'/@' +
							data.author.username +
							'@' +
							data.author.host}
						class="displayname subtle"
						><Mfm content={data.author.displayname} simple /></a
					>
					<a
						href={'/@' +
							data.author.username +
							'@' +
							data.author.host}
						class="username subtle"
						>@{data.author.username}{#if !data.author.local}
							@{data.author.host}
						{/if}</a
					>
				</div>
			</div>
			<div class="right">
				{#key timer}
					<span
						class="time"
						title={new Date(data.created_at).toLocaleString()}
						>{timeAgo(data.created_at)}</span
					>
				{/key}
				{#if data.visibility === 'public'}
					<Icon
						name="planet"
						size="18px"
						color="var(--txt-primary)"
						title={locale('public')}
					/>
				{:else if data.visibility === 'unlisted'}
					<Icon
						name="home"
						size="18px"
						color="var(--txt-primary)"
						title={locale('unlisted')}
					/>
				{:else if data.visibility === 'followers'}
					<Icon
						name="lock"
						size="18px"
						color="var(--txt-primary)"
						title={locale('followers_only')}
					/>
				{:else if data.visibility === 'direct'}
					<Icon
						name="mail"
						size="18px"
						color="var(--txt-primary)"
						title={locale('direct_note')}
					/>
				{/if}
			</div>
		</div>

		<p class="noteContent">
			{#if data.cw}
				<div class="warning" class:isOpen={cwOpen}>
					<div class="left">
						<Icon
							name="alert-triangle"
							size="18px"
							color="var(--warn)"
							margin="0px 7px 0px 0px"
						/>
						<span>{data.cw}</span>
					</div>
					<div class="right">
						<button on:click={toggleCw}>
							{#if cwOpen}
								{locale('close')}
							{:else}
								{locale('open')}
							{/if}
						</button>
					</div>
				</div>
				{#if cwOpen}
					<div style={detailed ? null : 'cursor: pointer;'}>
						<Mfm
							content={data.content}
							emojis={data.emojis}
							on:click={() => {
								if (!detailed) goto('/notes/' + data.id);
							}}
						/>
					</div>
				{/if}
			{:else}
				<div style={detailed ? null : 'cursor: pointer;'}>
					<Mfm
						content={data.content}
						emojis={data.emojis}
						on:click={() => {
							if (!detailed) goto('/notes/' + data.id);
						}}
					/>
				</div>
			{/if}
			{#if data.attachments && data.attachments.length > 0}
				<div id="gallery" class="pswp-gallery attachments">
					{#each data.attachments as attachment}
						{#if attachment.type.startsWith('image')}
							<a
								href={attachment.src}
								data-pswp-width={getWidth(attachment.src)}
								data-pswp-height={getHeight(attachment.src)}
								data-cropped="true"
								target="_blank"
								rel="noreferrer"
							>
								<img
									src={attachment.src}
									alt={attachment.alt}
									title={attachment.alt}
									class="attachmentImg"
								/>
							</a>
						{:else if attachment.type.startsWith('video')}
							<video
								src={attachment.src}
								title={attachment.alt}
								controls
							/>
						{:else}
							{attachment.src}
						{/if}
					{/each}
				</div>
			{/if}
			{#if detailed}
				<div class="details">
					{locale('posted_at')}
					{new Date(data.created_at).toLocaleTimeString(undefined, {
						weekday: 'long',
						month: 'long',
						day: 'numeric',
						year: 'numeric',
						hour: 'numeric',
						minute: '2-digit',
						second: '2-digit'
					})}
				</div>
			{/if}
		</p>

		{#if data.reactions}
			<div class="reactions">
				{#each data.reactions as reaction}
					<div class="reaction">
						<Emoji data={reaction} />
						{reaction.count}
					</div>
				{/each}
			</div>
		{/if}

		<div class="noteFooter">
			<div class="postButtons">
				<button>
					<Icon name="arrow-back-up" size="20px" color="inherit" />
				</button>
				<button>
					<Icon name="quote" size="20px" color="inherit" />
				</button>
				<button on:click={() => noteRepeat(data.id)}>
					<Icon name="repeat" size="20px" color="inherit" />
				</button>
				<button on:click={() => noteReact(data.id)}>
					<Icon name="star" size="20px" color="inherit" />
				</button>
				<button>
					<Icon name="plus" size="20px" color="inherit" />
				</button>
				<button on:click={() => noteBookmark(data.id)}>
					<Icon name="bookmark" size="20px" color="inherit" />
				</button>
				<button on:click={(e) => more.open(e)}>
					<Icon name="dots" size="20px" color="inherit" />
				</button>
			</div>
		</div>
	</article>

	<Dropdown bind:this={more}>
		{#if !detailed}
			<DropdownItem to={'/notes/' + data.id}>
				<Icon
					size="18px"
					name="arrows-maximize"
					margin="0px 8px 0px 0px"
				/>
				<span>{locale('expand_note')}</span>
			</DropdownItem>
			<hr />
		{/if}
		<DropdownItem
			on:click={() =>
				navigator.clipboard.writeText(
					$page.url.protocol +
						'//' +
						$page.url.host +
						'/notes/' +
						data.id
				)}
		>
			<Icon size="18px" name="link" margin="0px 8px 0px 0px" />
			<span>{locale('copy_link')}</span>
		</DropdownItem>
		{#if !data.local}
			<DropdownItem
				on:click={() => navigator.clipboard.writeText(data.ap_id)}
			>
				<Icon size="18px" name="link" margin="0px 8px 0px 0px" />
				<span>{locale('copy_link_origin')}</span>
			</DropdownItem>
			<DropdownItem on:click={() => (window.location.href = data.ap_id)}>
				<Icon
					size="18px"
					name="external-link"
					margin="0px 8px 0px 0px"
				/>
				<span>{locale('view_on_remote')}</span>
			</DropdownItem>
			<hr />
		{/if}
		<DropdownItem
			on:click={() => navigator.clipboard.writeText(data.content)}
		>
			<Icon size="18px" name="copy" margin="0px 8px 0px 0px" />
			<span>{locale('copy_content')}</span>
		</DropdownItem>
		<DropdownItem on:click={() => navigator.clipboard.writeText(data.id)}>
			<Icon size="18px" name="copy" margin="0px 8px 0px 0px" />
			<span>{locale('copy_note_id')}</span>
		</DropdownItem>
		<DropdownItem
			on:click={() => navigator.clipboard.writeText(data.author.id)}
		>
			<Icon size="18px" name="copy" margin="0px 8px 0px 0px" />
			<span>{locale('copy_user_id')}</span>
		</DropdownItem>
		<hr />
		<DropdownItem>
			<Icon
				size="18px"
				name="exclamation-circle"
				margin="0px 8px 0px 0px"
			/>
			<span>{locale('report_note')}</span>
		</DropdownItem>
		<DropdownItem>
			<Icon
				size="18px"
				name="exclamation-circle"
				margin="0px 8px 0px 0px"
			/>
			<span>{locale('report_user')}</span>
		</DropdownItem>
		<hr />
		<DropdownItem on:click={() => userBite(data.author.id)}>
			<Icon size="18px" name="dental" margin="0px 8px 0px 0px" />
			<span>{locale('bite_user')}</span>
		</DropdownItem>
		<hr />
		{#if !pinned}
			<DropdownItem on:click={() => notePin(data.id)}>
				<Icon size="18px" name="pin" margin="0px 8px 0px 0px" />
				<span>{locale('pin_note')}</span>
			</DropdownItem>
		{:else}
			<DropdownItem on:click={() => noteUnpin(data.id)}>
				<Icon size="18px" name="pin" margin="0px 8px 0px 0px" />
				<span>{locale('unpin_note')}</span>
			</DropdownItem>
		{/if}
		<hr />
		<DropdownItem>
			<Icon size="18px" name="pencil" margin="0px 8px 0px 0px" />
			<span>{locale('edit_note')}</span>
		</DropdownItem>
		<DropdownItem type="danger" on:click={() => noteDelete(data.id)}>
			<Icon
				size="18px"
				name="trash"
				color="var(--danger)"
				margin="0px 8px 0px 0px"
			/>
			<span>{locale('delete_edit_note')}</span>
		</DropdownItem>
		<DropdownItem type="danger" on:click={() => noteDelete(data.id)}>
			<Icon
				size="18px"
				name="trash"
				color="var(--danger)"
				margin="0px 8px 0px 0px"
			/>
			<span>{locale('delete_note')}</span>
		</DropdownItem>
	</Dropdown>
</template>

<style lang="scss">
	@import '../../../node_modules/photoswipe/dist/photoswipe.css';

	hr {
		width: calc(100% - 16px);
		margin-left: 8px;
		margin-right: 8px;
		border: 0px solid;
		border-top: var(--border-width-s) solid var(--bg-accent);
	}
	.noteContent {
		margin-top: 10px;
		margin-bottom: 10px;

		.attachments {
			display: grid;
			grid-auto-flow: column;
			margin-top: 10px;
			grid-gap: 8px;
			height: 100%;
			width: 100%;

			> a,
			video,
			audio {
				width: 100%;
				border-radius: var(--border-s);
				background-color: var(--bg-tertiary);
				max-height: 250px;

				.attachmentImg {
					width: 100%;
					height: 100%;
					object-fit: contain;
				}
			}
		}
	}
	.note {
		margin: 10px;
		padding: 20px;
		border-radius: var(--border-xl);
		background-color: var(--bg-secondary);
		overflow: clip;
	}
	.details {
		color: var(--txt-tertiary);
		margin-top: 10px;
	}
	.notePreheader {
		display: flex;
		align-items: center;
		font-size: var(--font-s);
		color: var(--txt-tertiary);
		margin-bottom: 10px;
	}
	.noteHeader {
		display: flex;
		.left {
			display: flex;
			flex-grow: 2;
			> .names {
				display: inline-flex;
				justify-content: center;
				flex-direction: column;
				margin-left: 10px;
				> a {
					display: block;
					&.displayname {
						font-weight: 600;
					}
					&.username {
						font-size: var(--font-m);
					}
				}
			}
		}
		.right {
			display: flex;
			gap: 4px;

			.time {
				font-size: 14px;
			}
		}
	}
	.reactions {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-bottom: 5px;
		overflow: hidden;
		flex-wrap: wrap;
		.reaction {
			display: flex;
			align-items: center;
			gap: 4px;
			margin-bottom: 5px;
		}
	}
	.noteFooter {
		.postButtons {
			display: flex;
			justify-content: space-between;
			align-items: center;

			> button {
				background: none;
				border: none;
				margin: 0px;
				padding: 0px;
				color: var(--txt-secondary);
				cursor: pointer;
				transition: 0.1s;

				&:hover {
					color: var(--txt-primary);
				}
			}
		}
	}
	.warning {
		display: flex;
		align-items: center;
		color: var(--warn);
		background-color: var(--warn-20);
		padding: 4px 6px;
		border-radius: var(--border-m);

		.left {
			display: inline-flex;
			align-items: center;
			flex-grow: 1;
			padding-left: 3px;
		}
		.right {
			display: inline-flex;
			align-items: center;
			flex-grow: 0;

			> button {
				font-family: var(--font);
			}
		}
		&.isOpen {
			margin-bottom: 10px;
		}
		button {
			color: var(--warn);
			background: var(--warn-20);
			border: none;
			padding: 5px 8px;
			border-radius: var(--border-s);
		}
	}
</style>
