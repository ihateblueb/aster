import * as mfm from 'mfm-js';

export default async function mfmFromRemote(remoteMfm: string, host: string) {
	let parsed = mfm.parse(remoteMfm);

	for (const i in parsed) {
		let e = parsed[i];

		if (e.type === 'mention' && !e.props.host) {
			console.log(e);
			console.log(e.props.acct, e.props.acct + '@' + host);

			remoteMfm = remoteMfm.replaceAll(
				e.props.acct,
				e.props.acct + '@' + host
			);
		}
	}

	return remoteMfm;
}
