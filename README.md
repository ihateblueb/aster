# aster

working on some kind of ap server
this should never be used seriously! i'm just being silly and having fun over here.

ignore all the inbox code. i need to redo all of it.
i wasnt sure what i was doing and made a lot of mistakes while writing it, so im going to redo it so this software is actually good. maybe.

## security

if you find a vulnerability in my software please contact me privately. see https://blueb.me/

## configuration

find it in config/example.yml.
use that template and create a production.yml in that same directory.

## followreq activity

{
'@context': [
'https://www.w3.org/ns/activitystreams',
'https://w3id.org/security/v1',
{
Key: 'sec:Key',
manuallyApprovesFollowers: 'as:manuallyApprovesFollowers',
sensitive: 'as:sensitive',
Hashtag: 'as:Hashtag',
quoteUrl: 'as:quoteUrl',
fedibird: 'http://fedibird.com/ns#',
quoteUri: 'fedibird:quoteUri',
toot: 'http://joinmastodon.org/ns#',
Emoji: 'toot:Emoji',
featured: 'toot:featured',
discoverable: 'toot:discoverable',
schema: 'http://schema.org#',
PropertyValue: 'schema:PropertyValue',
value: 'schema:value',
misskey: 'https://misskey-hub.net/ns#',
_misskey_content: 'misskey:_misskey_content',
_misskey_quote: 'misskey:_misskey_quote',
_misskey_reaction: 'misskey:_misskey_reaction',
_misskey_votes: 'misskey:_misskey_votes',
_misskey_summary: 'misskey:_misskey_summary',
isCat: 'misskey:isCat',
firefish: 'https://joinfirefish.org/ns#',
speakAsCat: 'firefish:speakAsCat',
sharkey: 'https://joinsharkey.org/ns#',
backgroundUrl: 'sharkey:backgroundUrl',
listenbrainz: 'sharkey:listenbrainz',
vcard: 'http://www.w3.org/2006/vcard/ns#'
}
],
id: 'https://eepy.zone/follows/9spb5qhlz5jp0032',
type: 'Follow',
actor: 'https://eepy.zone/users/9kfweg7wmdw7fnnt',
object: 'https://as1.blueb.me/users/1'
}
