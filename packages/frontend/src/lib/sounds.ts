type SoundType =
	| 'notification'
	| 'interact'
	| 'uninteract'
	| 'newNote'
	| 'timelineUpdate';

import meow1 from '$lib/sounds/meow_1.wav';
import meow2 from '$lib/sounds/meow_2.wav';
import meow3 from '$lib/sounds/meow_3.wav';
import meow4 from '$lib/sounds/meow_4.wav';
import meow5 from '$lib/sounds/meow_5.wav';
import meow6 from '$lib/sounds/meow_6.wav';

export default function playSound(type: SoundType) {
	let volume = 0.15;

	let one = new Audio(meow1);
	let two = new Audio(meow2);
	let three = new Audio(meow3);
	let four = new Audio(meow4);
	let five = new Audio(meow5);
	let six = new Audio(meow6);

	one.volume = volume;
	two.volume = volume;
	three.volume = volume;
	four.volume = volume;
	five.volume = volume;
	six.volume = volume;

	if (type === 'notification') four.play();
	if (type === 'interact') three.play();
	if (type === 'uninteract') five.play();
	if (type === 'newNote') six.play();
	if (type === 'timelineUpdate') one.play();
}
