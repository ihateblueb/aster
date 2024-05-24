# aster

[![Please don't upload to GitHub](https://nogithub.codeberg.page/badge.svg)](https://nogithub.codeberg.page)

working on some kind of fedi software.
this should never be used seriously! i'm just being silly and having fun over here.

frontend written in svelte and styling in sass. backend is in typescript.

static files can be placed in packages/frontend/static

originally, i was going to make it conform to the mastodon api. i think i will add a compatability thing later, but for now im just going to create my own similar but better (at least to me) api.

you do need to build the backend to run migrations. i know that sounds silly but everything here is silly.

shout out wafrn. i used it as a reference for a lot of stuff, its neat
https://github.com/gabboman/wafrn

## project status

### activitypub

-   [x] fetchable users
-   [x] fetchable notes
-   [-] accept activities (inboxes)
-   [ ] announce activities

### backend

-   [x] fetchable users
-   [x] fetchable notes
-   [x] fetchable instance info
-   [ ] fetchable remote instance info
-   [ ] register users
-   [ ] login users
-   [ ] create notes

### frontend

todo:

-   background, avatar, and banner alt text after added to backend

## security

if you find a vulnerability in my software please contact me privately. see https://blueb.me/

## configuration

find it in config/example.yml.
use that template and create a production.yml in that same directory.

## planned supported extensions

### activitystreams

-   [-] `as:manuallyApprovesFollowers`
-   [-] `as:sensitive`
-   [ ] `as:Hashtag`
-   [ ] `as:quoteUrl`

### mastodon

-   [ ] `toot:Emoji`
-   [ ] `toot:discoverable`

## fedibird

-   [ ] `fedibird:quoteUri`

### schema

-   [ ] `schema:PropertyValue`
-   [ ] `schema:value`

### misskey

-   [-] `misskey:_misskey_content`
-   [ ] `misskey:_misskey_quote`
-   [ ] `misskey:_misskey_vote` (i do not know what this is used for, but i will probably support it)
-   [ ] `misskey:_misskey_reaction`
-   [-] `misskey:_misskey_summary`
-   [-] `misskey:isCat`

### firefish

-   [-] `firefish:speakAsCat`

### sharkey

-   [-] `sharkey:backgroundUrl`

### mia's iceshrimp patches

-   [ ] `mia:bite` (i think this is the extension?)

## example followreq activity

for my reference

```json
{
	"@context": [
		"https://www.w3.org/ns/activitystreams",
		"https://w3id.org/security/v1",
		{
			"Key": "sec:Key",
			"manuallyApprovesFollowers": "as:manuallyApprovesFollowers",
			"sensitive": "as:sensitive",
			"Hashtag": "as:Hashtag",
			"quoteUrl": "as:quoteUrl",
			"fedibird": "http://fedibird.com/ns#",
			"quoteUri": "fedibird:quoteUri",
			"toot": "http://joinmastodon.org/ns#",
			"Emoji": "toot:Emoji",
			"featured": "toot:featured",
			"discoverable": "toot:discoverable",
			"schema": "http://schema.org#",
			"PropertyValue": "schema:PropertyValue",
			"value": "schema:value",
			"misskey": "https://misskey-hub.net/ns#",
			"_misskey_content": "misskey:_misskey_content",
			"_misskey_quote": "misskey:_misskey_quote",
			"_misskey_reaction": "misskey:_misskey_reaction",
			"_misskey_votes": "misskey:_misskey_votes",
			"_misskey_summary": "misskey:_misskey_summary",
			"isCat": "misskey:isCat",
			"firefish": "https://joinfirefish.org/ns#",
			"speakAsCat": "firefish:speakAsCat",
			"sharkey": "https://joinsharkey.org/ns#",
			"backgroundUrl": "sharkey:backgroundUrl",
			"listenbrainz": "sharkey:listenbrainz",
			"vcard": "http://www.w3.org/2006/vcard/ns#"
		}
	],
	"id": "https://eepy.zone/follows/9spb5qhlz5jp0032",
	"type": "Follow",
	"actor": "https://eepy.zone/users/9kfweg7wmdw7fnnt",
	"object": "https://as1.blueb.me/users/1"
}
```

## example note

```json
{
	"@context": [
		"https://www.w3.org/ns/activitystreams",
		"https://w3id.org/security/v1",
		{
			"Key": "sec:Key",
			"manuallyApprovesFollowers": "as:manuallyApprovesFollowers",
			"sensitive": "as:sensitive",
			"Hashtag": "as:Hashtag",
			"quoteUrl": "as:quoteUrl",
			"fedibird": "http://fedibird.com/ns#",
			"quoteUri": "fedibird:quoteUri",
			"toot": "http://joinmastodon.org/ns#",
			"Emoji": "toot:Emoji",
			"featured": "toot:featured",
			"discoverable": "toot:discoverable",
			"schema": "http://schema.org#",
			"PropertyValue": "schema:PropertyValue",
			"value": "schema:value",
			"misskey": "https://misskey-hub.net/ns#",
			"_misskey_content": "misskey:_misskey_content",
			"_misskey_quote": "misskey:_misskey_quote",
			"_misskey_reaction": "misskey:_misskey_reaction",
			"_misskey_votes": "misskey:_misskey_votes",
			"_misskey_summary": "misskey:_misskey_summary",
			"isCat": "misskey:isCat",
			"firefish": "https://joinfirefish.org/ns#",
			"speakAsCat": "firefish:speakAsCat",
			"sharkey": "https://joinsharkey.org/ns#",
			"backgroundUrl": "sharkey:backgroundUrl",
			"listenbrainz": "sharkey:listenbrainz",
			"vcard": "http://www.w3.org/2006/vcard/ns#"
		}
	],
	"id": "https://eepy.zone/notes/9sv3rkmjjvdr000z",
	"type": "Note",
	"attributedTo": "https://eepy.zone/users/9kfweg7wmdw7fnnt",
	"content": "<p>my silly ass made an ap request to my instance about a remote post</p>",
	"published": "2024-05-04T03:22:39.019Z",
	"to": ["https://www.w3.org/ns/activitystreams#Public"],
	"cc": ["https://eepy.zone/users/9kfweg7wmdw7fnnt/followers"],
	"inReplyTo": null,
	"attachment": [],
	"sensitive": false,
	"tag": []
}
```

## example actor

```json
{
	"@context": [
		"https://www.w3.org/ns/activitystreams",
		"https://w3id.org/security/v1",
		{
			"Key": "sec:Key",
			"manuallyApprovesFollowers": "as:manuallyApprovesFollowers",
			"sensitive": "as:sensitive",
			"Hashtag": "as:Hashtag",
			"quoteUrl": "as:quoteUrl",
			"fedibird": "http://fedibird.com/ns#",
			"quoteUri": "fedibird:quoteUri",
			"toot": "http://joinmastodon.org/ns#",
			"Emoji": "toot:Emoji",
			"featured": "toot:featured",
			"discoverable": "toot:discoverable",
			"schema": "http://schema.org#",
			"PropertyValue": "schema:PropertyValue",
			"value": "schema:value",
			"misskey": "https://misskey-hub.net/ns#",
			"_misskey_content": "misskey:_misskey_content",
			"_misskey_quote": "misskey:_misskey_quote",
			"_misskey_reaction": "misskey:_misskey_reaction",
			"_misskey_votes": "misskey:_misskey_votes",
			"_misskey_summary": "misskey:_misskey_summary",
			"isCat": "misskey:isCat",
			"firefish": "https://joinfirefish.org/ns#",
			"speakAsCat": "firefish:speakAsCat",
			"sharkey": "https://joinsharkey.org/ns#",
			"backgroundUrl": "sharkey:backgroundUrl",
			"listenbrainz": "sharkey:listenbrainz",
			"vcard": "http://www.w3.org/2006/vcard/ns#"
		}
	],
	"type": "Person",
	"id": "https://eepy.zone/users/9kfweg7wmdw7fnnt",
	"inbox": "https://eepy.zone/users/9kfweg7wmdw7fnnt/inbox",
	"outbox": "https://eepy.zone/users/9kfweg7wmdw7fnnt/outbox",
	"followers": "https://eepy.zone/users/9kfweg7wmdw7fnnt/followers",
	"following": "https://eepy.zone/users/9kfweg7wmdw7fnnt/following",
	"featured": "https://eepy.zone/users/9kfweg7wmdw7fnnt/collections/featured",
	"sharedInbox": "https://eepy.zone/inbox",
	"endpoints": { "sharedInbox": "https://eepy.zone/inbox" },
	"url": "https://eepy.zone/@blueb",
	"preferredUsername": "blueb",
	"name": "malicious harper",
	"summary": "<p><div><i><b>hi im harper</b></i> <i>​:waving:​</i><span><br></span><i><small><b>kattgutte er ikke ekte</b></small></i></div><span><br>minor!!!! <br><br>bad programmer, subpar sysadmin, silly creature, eepy.zone admin<br><br>current setup: gnome on arch, although i typically use kde :3<br><br>working on my own </span><i>terrible</i><span> fedi software. i will be posting about that a lot while working on it. sorryyyy!<br><br>feel free to follow request. your vibe will be checked<br><br>alt </span><a href=\"https://eepy.zone/@harper@akko.eepy.zone\" class=\"u-url mention\">@harper@akko.eepy.zone</a><span><br>alt.. 2! </span><a href=\"https://eepy.zone/@blueb@labyrinth.zone\" class=\"u-url mention\">@blueb@labyrinth.zone</a><span><br>aster account: </span><a href=\"https://eepy.zone/@blueb@as2.blueb.me\" class=\"u-url mention\">@blueb@as2.blueb.me</a><span><br>private </span><a href=\"https://eepy.zone/@blueb@grimgreenfo.rest\" class=\"u-url mention\">@blueb@grimgreenfo.rest</a><span><br><br></span><div><i>⚠️ warning: sometimes i like to get a little silly. ⚠️</i></div><div><i>if you can see this, you should look at my profile on my instance. it'll look cooler</i></div></p>",
	"_misskey_summary": "<center>$[x2 **hi im harper**] $[spin :waving:]\n$[position.y=-0.4 <small>**kattgutte er ikke ekte**</small>]</center>\n\nminor!!!! \n\nbad programmer, subpar sysadmin, silly creature, eepy.zone admin\n\ncurrent setup: gnome on arch, although i typically use kde :3\n\nworking on my own $[small terrible] fedi software. i will be posting about that a lot while working on it. sorryyyy!\n\nfeel free to follow request. your vibe will be checked\n\nalt @harper@akko.eepy.zone\nalt.. 2! @blueb@labyrinth.zone\naster account: @blueb@as2.blueb.me\nprivate @blueb@grimgreenfo.rest\n\n\n<center>$[fg.color=e63939 ⚠️ warning: sometimes i like to get a little silly. ⚠️]</center>\n<center>\n$[scale.y=0,x=0 if you can see this, you should look at my profile on my instance. it'll look cooler]</center>",
	"icon": {
		"type": "Image",
		"url": "https://media.eepy.zone/mkmedia/webpublic-87770270-05b0-488d-8a8b-e0438956d323.png",
		"sensitive": false,
		"name": null
	},
	"image": {
		"type": "Image",
		"url": "https://media.eepy.zone/mkmedia/6802825f-74f3-4506-90f4-53575730d640.webp",
		"sensitive": false,
		"name": null
	},
	"backgroundUrl": null,
	"tag": [
		{
			"id": "https://eepy.zone/emojis/waving",
			"type": "Emoji",
			"name": ":waving:",
			"updated": "2024-02-20T06:36:59.680Z",
			"icon": {
				"type": "Image",
				"mediaType": "image/gif",
				"url": "https://media.eepy.zone/mkmedia/9b360c62-bf57-41ba-9eeb-03ce9569cb75"
			}
		}
	],
	"manuallyApprovesFollowers": true,
	"discoverable": true,
	"publicKey": {
		"id": "https://eepy.zone/users/9kfweg7wmdw7fnnt#main-key",
		"type": "Key",
		"owner": "https://eepy.zone/users/9kfweg7wmdw7fnnt",
		"publicKeyPem": "-----BEGIN PUBLIC KEY-----\nMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEArGcrQRt3bwzCW4FrF7tP\nxLYZtRuK6WtF4A9GZOk2hpb3QQiX24fR80hPFCDBfC7TVHi2swvdixHsuLMweSWT\n8J09NXZNZFTIGZ2BSorlrshrKRocSipqif2oMIL8dQpPldPZj6ks1xeUbAto37HV\nHk8l23zKkQ84764x89eWvG9thTCDtPZLsjC1FLdh+tndb/9XTycVTX1/EfHEHnLm\n60sDTBDfl63V+NNPMiMeXnLTKF1pAjtbXkAddJXdIjbRrSv4VzTisBWjQXK0uPgb\nR2UKMYC4smGaWjWSGS+nnEH49tin93FUDQzeLpUrfwKmhbyhZjtH5h7/8KFKzkt/\nbBIzCO5Co7JhK70ke6BJjs/xn8KwoyaTVh5+tN6RkZasOmiDIH5jb0vMu85PeurU\nG/v2BKF0ds0uwbmZbp+AOCZNe637CueyH5J12QIcLutDkLF1LLDRA+8utdWNOL9R\nIuT3RCFdnWoFPhhvRGqyu1kWauEVF4F+uozANthG0uiqUqlB48NISdsZAQozezZ+\nzrjuK39Zh/JPfXAoJF2wUu7NNrOtKAukWcXx7iK2q2x9iNsx22Jo/WB+G/R59fxJ\nFH5FA6pYj7WZSxeUwuDLRNI0w1lSkQnm/d3P14CY+4dsox4jCy+WZdVwybgwx1cB\npFb2MUzZjXdsVFUwtsmhZesCAwEAAQ==\n-----END PUBLIC KEY-----\n"
	},
	"isCat": true,
	"noindex": false,
	"speakAsCat": true,
	"attachment": [
		{
			"type": "PropertyValue",
			"name": "website",
			"value": "<a href=\"https://blueb.me/\" rel=\"me nofollow noopener\" target=\"_blank\">https://blueb.me/</a>"
		},
		{
			"type": "PropertyValue",
			"name": "email",
			"value": "ihateblueb@proton.me"
		},
		{ "type": "PropertyValue", "name": "discord", "value": "ihateblueb" },
		{
			"type": "PropertyValue",
			"name": "retrospring",
			"value": "<a href=\"https://retrospring.net/@blueb\" rel=\"me nofollow noopener\" target=\"_blank\">https://retrospring.net/@blueb</a>"
		},
		{ "type": "PropertyValue", "name": "age", "value": "16" },
		{
			"type": "PropertyValue",
			"name": "languages",
			"value": "en (native), no (very poorly)"
		},
		{
			"type": "PropertyValue",
			"name": "pronouns",
			"value": "it or she :3 (https://prns.cc/bazmp)"
		},
		{
			"type": "PropertyValue",
			"name": "keyoxide",
			"value": "[aspe:keyoxide.org:WINULIVTB46JSFWOERVVX3DUWM](https://keyoxide.org/aspe%3Akeyoxide.org%3AWINULIVTB46JSFWOERVVX3DUWM)"
		}
	],
	"alsoKnownAs": ["https://wetdry.world/users/ihateblueb"],
	"vcard:bday": "1642-03-27",
	"vcard:Address": "a cozy bed"
}
```

## example reply

```json
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
  id: 'https://eepy.zone/notes/9tnj8y2kryzh00ic/activity',
  actor: 'https://eepy.zone/users/9kfweg7wmdw7fnnt',
  type: 'Create',
  published: '2024-05-24T00:53:36.764Z',
  object: {
    id: 'https://eepy.zone/notes/9tnj8y2kryzh00ic',
    type: 'Note',
    attributedTo: 'https://eepy.zone/users/9kfweg7wmdw7fnnt',
    content: '<p><a href="https://as2.blueb.me/users/690d0271-4147-4302-ac50-7806f3ad8f87" class="u-url mention">@breen@as2.blueb.me</a> i was trying ti figure out how to determine visibility but that didnt work because my logs were immediately flooded. i think im a little stupid. just a bit</p>',
    published: '2024-05-24T00:53:36.764Z',
    to: [ 'https://eepy.zone/users/9kfweg7wmdw7fnnt/followers' ],
    cc: [
      'https://as2.blueb.me/users/690d0271-4147-4302-ac50-7806f3ad8f87'
    ],
    inReplyTo: 'https://as2.blueb.me/notes/aee066ac-a4e8-4442-8c58-e981cded9964',
    attachment: [],
    sensitive: false,
    tag: [ [Object] ]
  },
  to: [ 'https://eepy.zone/users/9kfweg7wmdw7fnnt/followers' ],
  cc: [ 'https://as2.blueb.me/users/690d0271-4147-4302-ac50-7806f3ad8f87' ]
}
```

## rsa keygen commands

`openssl genrsa -out private.pem 2048`
`openssl rsa -in private.pem -outform PEM -pubout -out public.pem`
