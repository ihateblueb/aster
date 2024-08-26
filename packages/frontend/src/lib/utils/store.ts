import { writable } from 'svelte/store';

const theme = writable('', () => {
	console.log('got a subscriber');
	return () => console.log('no more subscribers');
});

const font = writable('', () => {
	console.log('got a subscriber');
	return () => console.log('no more subscribers');
});

export default {
	theme: theme,
	font: font
};
