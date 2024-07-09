import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

export default function sanitize(content: string) {
	const window = new JSDOM('').window;
	const purify = DOMPurify(window);

	return purify.sanitize(content, {
		FORBID_TAGS: ['span', 'a']
	});
}
