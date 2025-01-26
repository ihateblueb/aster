import ConfigService from '../services/ConfigService.js';

export default [
	'https://www.w3.org/ns/activitystreams',
	'https://w3id.org/security/v1',
	//ConfigService.url.href + 'context.json'
	{
		Key: 'sec:Key',
		sensitive: 'as:sensitive',
		manuallyApprovesFollowers: 'as:manuallyApprovesFollowers',
		quoteUrl: 'as:quoteUrl',
		Hashtag: 'as:Hashtag',
		// vcard
		vcard: 'http://www.w3.org/2006/vcard/ns#',
		// schema
		//schema: 'http://schema.org#',
		//PropertyValue: 'schema:PropertyValue',
		//value: 'schema:value',
		// mastodon
		toot: 'http://joinmastodon.org/ns#',
		//Emoji: 'toot:Emoji',
		//featured: 'toot:featured',
		discoverable: 'toot:discoverable',
		// fedibird
		fedibird: 'http://fedibird.com/ns#',
		quoteUri: 'fedibird:quoteUri',
		// misskey
		misskey: 'https://misskey-hub.net/ns#',
		_misskey_content: 'misskey:_misskey_content',
		_misskey_quote: 'misskey:_misskey_quote',
		//_misskey_reaction: 'misskey:_misskey_reaction',
		_misskey_summary: 'misskey:_misskey_summary',
		isCat: 'misskey:isCat',
		// firefish
		firefish: 'https://joinfirefish.org/ns#',
		speakAsCat: 'firefish:speakAsCat',
		// bite
		Bite: 'https://ns.mia.jetzt/as#Bite',
		// aster
		aster: 'https://blueb.pages.gay/ns#',
		visibility: 'aster:visibility',
		//Mood: 'aster:Mood',
		//hasCorrectAnswer: 'aster:hasCorrectAnswer',
		//correct: 'aster:correct',
		pancakes: 'https://ns.pancakes.gay/as#',
		Pronouns: 'pancakes:Pronouns'
	}
];
