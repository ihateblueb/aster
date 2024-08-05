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
			wheelToZoom: true,

			arrowPrevSVG:
				'<i class="ti ti-chevron-left" style="font-size: 32px; color: var(--txt-secondary);"></i>',
			arrowNextSVG:
				'<i class="ti ti-chevron-right" style="font-size: 32px; color: var(--txt-secondary);"></i>',
			closeSVG:
				'<i class="ti ti-x" style="font-size: 20px; color: var(--txt-secondary);"></i>',
			zoomSVG:
				'<i class="ti ti-zoom-in" style="font-size: 20px; color: var(--txt-secondary);"></i>',

			pswpModule: () => PhotoSwipe
		};

		let lightbox = new Lightbox(options);

		lightbox.on('uiRegister', function () {
			lightbox.pswp.ui.registerElement({
				name: 'caption',
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
								captionHTML = hiddenCaption.innerHTML;
							} else {
								captionHTML = `<div class="pswp__caption-content">${currSlideElement
									.querySelector('img')
									.getAttribute('alt')}</div>`;
							}
						}
						el.innerHTML = captionHTML || '';
					});
				}
			});
		});
		lightbox.init();
	});

	function getWidth(src) {
		let img = new Image();
		img.src = src;
		console.log(src + ' ' + img.naturalWidth);
		return img.naturalWidth;
	}

	function getHeight(src) {
		let img = new Image();
		img.src = src;
		console.log(src + ' ' + img.naturalHeight);
		return img.naturalHeight;
	}
</script>

<template>
	{#if attachments && attachments.length > 0}
		<div id="gallery" class="pswp-gallery attachments _9H50yED">
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
					<!-- svelte-ignore a11y-media-has-caption -->
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
					/>
				{:else}
					{attachment.src}
				{/if}
			{/each}
		</div>
	{/if}
</template>
