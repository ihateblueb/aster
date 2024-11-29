import * as mfm from 'mfm-js';

class MfmService {
	public parse(content: string, simple?: boolean) {
		if (simple) return mfm.parseSimple(content);
		if (!simple) return mfm.parse(content);
	}

	public toHtml(content: string) {}

	public localize(content: string) {
		// turn mentions from remote into mentions usable here
	}

	public extractMentions(content: string) {}
}

export default new MfmService();
