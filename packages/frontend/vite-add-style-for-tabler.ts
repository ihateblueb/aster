import MagicString from 'magic-string';

export default function tablerWidthHeightStyleAdder(): import('vite').Plugin {
	return {
		name: 'tabler-width-height-style-adder',
		transform(code, id) {
			const ms = new MagicString(code, { filename: id });

			const re = /Icon.*?size:.*?"(.*?)".*?}\);/gs;

			ms.replace(re, (match, size: string) => {
				let toreturn = match.replaceAll(
					`size: "${size}"`,
					`size: "${size}", style: "width:${size};height:${size};"`
				);
				return toreturn;
			});

			if (ms.hasChanged()) {
				return {
					code: ms.toString(),
					map: ms.generateMap()
				};
			}
		}
	};
}