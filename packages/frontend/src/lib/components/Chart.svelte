<script>
	import * as uuid from 'uuid';
	import { onMount } from 'svelte';
	import { Chart } from 'chart.js/auto';

	let { type, labels = [], datasets = [] } = $props();

	const id = 'chart-' + uuid.v4();

	let ctx;
	let canvas;

	onMount(async () => {
		ctx = canvas.getContext('2d');

		new Chart(ctx, {
			type: type,
			data: {
				labels: labels,
				datasets: datasets
			},
			options: {
				responsive: true,
				/* @ts-ignore: this works */
				pointStyle: false,
				plugins: {
					/* @ts-ignore: this works too */
					legend: false
				},
				scales: {
					x: {
						display: false,
						title: {
							display: false
						}
					},
					y: {
						display: false,
						title: {
							display: false
						}
					}
				}
			}
		});
	});
</script>

<canvas {id} bind:this={canvas}></canvas>
