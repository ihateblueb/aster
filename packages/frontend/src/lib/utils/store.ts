import { writable } from 'svelte/store';

const activeRequests = writable(0, () => {
	console.log('got a subscriber');
	return () => console.log('no more subscribers');
});

const theme = writable('', () => {
	console.log('got a subscriber');
	return () => console.log('no more subscribers');
});

const font = writable('', () => {
	console.log('got a subscriber');
	return () => console.log('no more subscribers');
});

export default {
	activeRequests: activeRequests,
	theme: theme,
	font: font
};
