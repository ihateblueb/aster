import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';

export default function sanitize(content: string) {
	const window = new JSDOM('').window;
	const purify = DOMPurify(window);

	return purify.sanitize(content);
}
