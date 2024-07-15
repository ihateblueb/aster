<script>
	import { onMount } from 'svelte';
	import { locale } from '$lib/locale';

	import Lightbox from '../../../node_modules/photoswipe/dist/photoswipe-lightbox.esm.js';
	import PhotoSwipe from '../../../node_modules/photoswipe/dist/photoswipe.esm.js';

	export let attachments;

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
	{#if attachments && attachments.length > 0}
		<div id="gallery" class="pswp-gallery attachments">
			{#each attachments as attachment}
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
							loading="eager"
						/>
					</a>
				{:else if attachment.type.startsWith('video')}
					<video
						src={attachment.src}
						title={attachment.alt}
						aria-label={attachment.alt}
						preload="metadata"
						controls
					/>
				{:else if attachment.type.startsWith('audio')}
					<audio
						src={attachment.src}
						title={attachment.alt}
						aria-label={attachment.alt}
						preload="metadata"
						controls
					></audio>
				{:else}
					{attachment.src}
				{/if}
			{/each}
		</div>
	{/if}
</template>

<style lang="scss">
	@import '../../../node_modules/photoswipe/dist/photoswipe.css';

	.attachments {
		display: grid;
		grid-auto-flow: column;
		margin-top: 10px;
		grid-gap: 8px;
		height: 100%;
		width: 100%;

		a,
		img,
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
</style>
