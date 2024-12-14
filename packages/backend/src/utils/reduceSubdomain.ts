import psl from 'psl';

export default function reduceSubdomain(content: string) {
	const url = content;
	return url.replace(psl.parse(url).subdomain + '.', '');
}
