import * as mfm from 'mfm-js';
import { MfmNode } from 'mfm-js';

import ConfigService from './ConfigService.js';

class MfmService {
	public parse(content: string, simple?: boolean) {
		if (simple) return mfm.parseSimple(content);
		return mfm.parse(content);
	}

	public toHtml(content: string) {
		//const parsed = this.parse(content, true);
	}

	private iterateAndRun(nodes: mfm.MfmNode[], run: Function) {
		for (let node of nodes) {
			run(node);

			if (node.children) this.iterateAndRun(node.children, run);
		}
	}

	public extractMentions(content: string) {
		let parse = this.parse(content, false);
		let mentions = [];

		this.iterateAndRun(parse, (node: MfmNode) => {
			if (node.type === 'mention' && node.props.acct) {
				mentions.push(node.props.acct);
			}
		});

		return mentions;
	}

	public extractEmojis(content: string) {
		let parse = this.parse(content, true);
		let emojis = [];

		this.iterateAndRun(parse, (node) => {
			if (node.type === 'emojiCode' && node.props.name) {
				emojis.push(node.props.name);
			}
		});

		return emojis;
	}

	public localize(content: string, host: string) {
		let parse = this.parse(content);

		this.iterateAndRun(parse, (node) => {
			if (node.type === 'mention' && !node.props.host) {
				node.props.host = host;
				node.props.acct += '@' + host;
			}
		});

		return mfm.toString(parse).replaceAll('@' + ConfigService.url.host, '');
	}
}

export default new MfmService();
