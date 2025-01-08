import * as mfm from 'mfm-js';

import ConfigService from './ConfigService.js';

class MfmService {
	public parse(content: string, simple?: boolean) {
		if (simple) return mfm.parseSimple(content);
		return mfm.parse(content);
	}

	public toHtml(content: string) {
		//const parsed = this.parse(content, true);
	}

	// turn  mentions from remote with no host into mentions usable here
	public localize(content: string, host: string) {
		let parse = this.parse(content);

		for (let node of parse) {
			if (node.type === 'mention' && !node.props.host) {
				node.props.host = host;
				node.props.acct += '@' + host;
			}
		}

		return mfm.toString(parse).replaceAll('@' + ConfigService.url.host, '');
	}
}

export default new MfmService();
