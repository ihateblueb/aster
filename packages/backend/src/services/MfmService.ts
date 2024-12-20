import * as mfm from 'mfm-js';

class MfmService {
	public parse(content: string, simple?: boolean) {
		if (simple) return mfm.parseSimple(content);
		return mfm.parse(content);
	}

	public toHtml(content: string) {
		//const parsed = this.parse(content, true);
	}

	public localize(content: string) {
		// turn mentions from remote into mentions usable here
	}
}

export default new MfmService();
