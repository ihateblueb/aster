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
-   [ ] fetchable notes
-   [ ] accept activities (inboxes)
-   [ ] announce activities

### backend

-   [x] fetchable users
-   [x] fetchable notes
-   [x] fetchable instance info
-   [ ] fetchable remote instance info
-   [ ] register users
-   [ ] create notes

### frontend

for development only purposes you can set an api url to use that isnt default by setting `PUBLIC_APIURL` in the .env of packages/frontend.

todo:

-   background, avatar, and banner alt text after added to backend

### misc

-   [ ] prettier logs
-   [ ] split it up into workers so the entire thing doesnt crumble on error

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
-   [-] `as:quoteUrl`

### mastodon

-   [ ] `toot:Emoji`
-   [ ] `toot:discoverable`

## fedibird

-   [-] `fedibird:quoteUri`

### schema

-   [ ] `schema:PropertyValue`
-   [ ] `schema:value`

### misskey

-   [-] `misskey:_misskey_content`
-   [-] `misskey:_misskey_quote`
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

## rsa keygen commands

`openssl genrsa -out private.pem 2048`
`openssl rsa -in private.pem -outform PEM -pubout -out public.pem`
