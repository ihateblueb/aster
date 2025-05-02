export default function (object: any[], path: string[]) {
	let result = object;
	for (const key of path) {
		if (typeof result === 'object' && key in result) result = result[key];
	}
	return result;
}
