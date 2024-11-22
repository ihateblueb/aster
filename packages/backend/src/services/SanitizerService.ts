import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

class SanitizerService {
	public sanitize(content: string) {
		const window = new JSDOM('').window;
		const purify = DOMPurify(window);
		const clean = purify.sanitize(content);
		window.close();
		return clean;
	}
}

export default new SanitizerService();
