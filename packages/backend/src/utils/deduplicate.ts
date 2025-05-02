import getDeepValue from './getDeepValue.js';

export default function (array: any[], by: string[]) {
	let existingValues = [];

	return array.filter((item) => {
		let thisValue = getDeepValue(item, by);
		if (!existingValues.includes(thisValue)) {
			existingValues.push(thisValue);
			return thisValue;
		}
		return;
	});
}
