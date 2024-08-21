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

## example replies from akkoma

direct note

```json
{
	"@context": [
		"https://www.w3.org/ns/activitystreams",
		"https://akko.eepy.zone/schemas/litepub-0.1.jsonld",
		{ "@language": "und" }
	],
	"actor": "https://akko.eepy.zone/users/harper",
	"cc": [],
	"context": "https://akko.eepy.zone/contexts/f718a425-60ea-4bda-92c6-b4266aff97cc",
	"directMessage": true,
	"id": "https://akko.eepy.zone/activities/7d0ff46e-e6b5-46ed-8ca6-427745cb7d6a",
	"object": {
		"actor": "https://akko.eepy.zone/users/harper",
		"attachment": [],
		"attributedTo": "https://akko.eepy.zone/users/harper",
		"cc": [],
		"content": "<p><span class=\"h-card\"><a class=\"u-url mention\" data-user=\"AiCSHFYUAx5ND0J2KO\" href=\"https://as2.blueb.me/users/690d0271-4147-4302-ac50-7806f3ad8f87\" rel=\"ugc\">@<span>breen</span></a></span> private post to mention</p>",
		"contentMap": {
			"en": "<p><span class=\"h-card\"><a class=\"u-url mention\" data-user=\"AiCSHFYUAx5ND0J2KO\" href=\"https://as2.blueb.me/users/690d0271-4147-4302-ac50-7806f3ad8f87\" rel=\"ugc\">@<span>breen</span></a></span> private post to mention</p>"
		},
		"context": "https://akko.eepy.zone/contexts/f718a425-60ea-4bda-92c6-b4266aff97cc",
		"conversation": "https://akko.eepy.zone/contexts/f718a425-60ea-4bda-92c6-b4266aff97cc",
		"id": "https://akko.eepy.zone/objects/ceb3d417-11a0-4873-a879-7f1b07f620d4",
		"published": "2024-05-24T19:49:52.780645Z",
		"sensitive": null,
		"source": {
			"content": "@breen@as2.blueb.me private post to mention",
			"mediaType": "text/x.misskeymarkdown"
		},
		"summary": "",
		"tag": [
			{
				"href": "https://as2.blueb.me/users/690d0271-4147-4302-ac50-7806f3ad8f87",
				"name": "@breen@as2.blueb.me",
				"type": "Mention"
			}
		],
		"to": [
			"https://as2.blueb.me/users/690d0271-4147-4302-ac50-7806f3ad8f87"
		],
		"type": "Note"
	},
	"published": "2024-05-24T19:49:52.780595Z",
	"to": ["https://as2.blueb.me/users/690d0271-4147-4302-ac50-7806f3ad8f87"],
	"type": "Create"
}
```

followers

```json
{
	"@context": [
		"https://www.w3.org/ns/activitystreams",
		"https://akko.eepy.zone/schemas/litepub-0.1.jsonld",
		{ "@language": "und" }
	],
	"actor": "https://akko.eepy.zone/users/harper",
	"cc": [],
	"context": "https://akko.eepy.zone/contexts/c47464de-15b3-4e0e-9d88-449bd1fe54d3",
	"directMessage": false,
	"id": "https://akko.eepy.zone/activities/a39e8d3e-3285-42bb-b92e-89e91dc2e53e",
	"object": {
		"actor": "https://akko.eepy.zone/users/harper",
		"attachment": [],
		"attributedTo": "https://akko.eepy.zone/users/harper",
		"cc": [],
		"content": "<p><span class=\"h-card\"><a class=\"u-url mention\" data-user=\"AiCSHFYUAx5ND0J2KO\" href=\"https://as2.blueb.me/users/690d0271-4147-4302-ac50-7806f3ad8f87\" rel=\"ugc\">@<span>breen</span></a></span> followers</p>",
		"contentMap": {
			"en": "<p><span class=\"h-card\"><a class=\"u-url mention\" data-user=\"AiCSHFYUAx5ND0J2KO\" href=\"https://as2.blueb.me/users/690d0271-4147-4302-ac50-7806f3ad8f87\" rel=\"ugc\">@<span>breen</span></a></span> followers</p>"
		},
		"context": "https://akko.eepy.zone/contexts/c47464de-15b3-4e0e-9d88-449bd1fe54d3",
		"conversation": "https://akko.eepy.zone/contexts/c47464de-15b3-4e0e-9d88-449bd1fe54d3",
		"id": "https://akko.eepy.zone/objects/ff8a06d0-a3e5-4f38-a6fc-d4ffdaaaa393",
		"published": "2024-05-24T19:51:26.088869Z",
		"sensitive": true,
		"source": {
			"content": "@breen@as2.blueb.me followers",
			"mediaType": "text/x.misskeymarkdown"
		},
		"summary": "test",
		"tag": [
			{
				"href": "https://as2.blueb.me/users/690d0271-4147-4302-ac50-7806f3ad8f87",
				"name": "@breen@as2.blueb.me",
				"type": "Mention"
			}
		],
		"to": [
			"https://akko.eepy.zone/users/harper/followers",
			"https://as2.blueb.me/users/690d0271-4147-4302-ac50-7806f3ad8f87"
		],
		"type": "Note"
	},
	"published": "2024-05-24T19:51:26.088804Z",
	"to": [
		"https://akko.eepy.zone/users/harper/followers",
		"https://as2.blueb.me/users/690d0271-4147-4302-ac50-7806f3ad8f87"
	],
	"type": "Create"
}
```

unlisted

```json
{
	"@context": [
		"https://www.w3.org/ns/activitystreams",
		"https://akko.eepy.zone/schemas/litepub-0.1.jsonld",
		{ "@language": "und" }
	],
	"actor": "https://akko.eepy.zone/users/harper",
	"cc": ["https://www.w3.org/ns/activitystreams#Public"],
	"context": "https://akko.eepy.zone/contexts/35f11819-6b15-438c-986f-b4e6f7e1ee49",
	"directMessage": false,
	"id": "https://akko.eepy.zone/activities/d92c50ae-7b71-4bce-8666-8a28fd002f6c",
	"object": {
		"actor": "https://akko.eepy.zone/users/harper",
		"attachment": [],
		"attributedTo": "https://akko.eepy.zone/users/harper",
		"cc": ["https://www.w3.org/ns/activitystreams#Public"],
		"content": "<p><span class=\"h-card\"><a class=\"u-url mention\" data-user=\"AiCSHFYUAx5ND0J2KO\" href=\"https://as2.blueb.me/users/690d0271-4147-4302-ac50-7806f3ad8f87\" rel=\"ugc\">@<span>breen</span></a></span> unlisted</p>",
		"contentMap": {
			"en": "<p><span class=\"h-card\"><a class=\"u-url mention\" data-user=\"AiCSHFYUAx5ND0J2KO\" href=\"https://as2.blueb.me/users/690d0271-4147-4302-ac50-7806f3ad8f87\" rel=\"ugc\">@<span>breen</span></a></span> unlisted</p>"
		},
		"context": "https://akko.eepy.zone/contexts/35f11819-6b15-438c-986f-b4e6f7e1ee49",
		"conversation": "https://akko.eepy.zone/contexts/35f11819-6b15-438c-986f-b4e6f7e1ee49",
		"id": "https://akko.eepy.zone/objects/e86244f6-ecc2-4dc6-8f70-fc8ec49fadea",
		"published": "2024-05-24T19:53:09.985963Z",
		"sensitive": true,
		"source": {
			"content": "@breen@as2.blueb.me unlisted",
			"mediaType": "text/x.misskeymarkdown"
		},
		"summary": "test",
		"tag": [
			{
				"href": "https://as2.blueb.me/users/690d0271-4147-4302-ac50-7806f3ad8f87",
				"name": "@breen@as2.blueb.me",
				"type": "Mention"
			}
		],
		"to": [
			"https://akko.eepy.zone/users/harper/followers",
			"https://as2.blueb.me/users/690d0271-4147-4302-ac50-7806f3ad8f87"
		],
		"type": "Note"
	},
	"published": "2024-05-24T19:53:09.985915Z",
	"to": [
		"https://akko.eepy.zone/users/harper/followers",
		"https://as2.blueb.me/users/690d0271-4147-4302-ac50-7806f3ad8f87"
	],
	"type": "Create"
}
```

unlisted

```json
{
	"@context": [
		"https://www.w3.org/ns/activitystreams",
		"https://akko.eepy.zone/schemas/litepub-0.1.jsonld",
		{ "@language": "und" }
	],
	"actor": "https://akko.eepy.zone/users/harper",
	"cc": ["https://www.w3.org/ns/activitystreams#Public"],
	"context": "https://akko.eepy.zone/contexts/35f11819-6b15-438c-986f-b4e6f7e1ee49",
	"directMessage": false,
	"id": "https://akko.eepy.zone/activities/d92c50ae-7b71-4bce-8666-8a28fd002f6c",
	"object": {
		"actor": "https://akko.eepy.zone/users/harper",
		"attachment": [],
		"attributedTo": "https://akko.eepy.zone/users/harper",
		"cc": ["https://www.w3.org/ns/activitystreams#Public"],
		"content": "<p><span class=\"h-card\"><a class=\"u-url mention\" data-user=\"AiCSHFYUAx5ND0J2KO\" href=\"https://as2.blueb.me/users/690d0271-4147-4302-ac50-7806f3ad8f87\" rel=\"ugc\">@<span>breen</span></a></span> unlisted</p>",
		"contentMap": {
			"en": "<p><span class=\"h-card\"><a class=\"u-url mention\" data-user=\"AiCSHFYUAx5ND0J2KO\" href=\"https://as2.blueb.me/users/690d0271-4147-4302-ac50-7806f3ad8f87\" rel=\"ugc\">@<span>breen</span></a></span> unlisted</p>"
		},
		"context": "https://akko.eepy.zone/contexts/35f11819-6b15-438c-986f-b4e6f7e1ee49",
		"conversation": "https://akko.eepy.zone/contexts/35f11819-6b15-438c-986f-b4e6f7e1ee49",
		"id": "https://akko.eepy.zone/objects/e86244f6-ecc2-4dc6-8f70-fc8ec49fadea",
		"published": "2024-05-24T19:53:09.985963Z",
		"sensitive": true,
		"source": {
			"content": "@breen@as2.blueb.me unlisted",
			"mediaType": "text/x.misskeymarkdown"
		},
		"summary": "test",
		"tag": [
			{
				"href": "https://as2.blueb.me/users/690d0271-4147-4302-ac50-7806f3ad8f87",
				"name": "@breen@as2.blueb.me",
				"type": "Mention"
			}
		],
		"to": [
			"https://akko.eepy.zone/users/harper/followers",
			"https://as2.blueb.me/users/690d0271-4147-4302-ac50-7806f3ad8f87"
		],
		"type": "Note"
	},
	"published": "2024-05-24T19:53:09.985915Z",
	"to": [
		"https://akko.eepy.zone/users/harper/followers",
		"https://as2.blueb.me/users/690d0271-4147-4302-ac50-7806f3ad8f87"
	],
	"type": "Create"
}
```

global

```json
{
	"@context": [
		"https://www.w3.org/ns/activitystreams",
		"https://akko.eepy.zone/schemas/litepub-0.1.jsonld",
		{ "@language": "und" }
	],
	"actor": "https://akko.eepy.zone/users/harper",
	"cc": ["https://akko.eepy.zone/users/harper/followers"],
	"context": "https://akko.eepy.zone/contexts/b2d711fe-9a05-4995-8f60-801101cf075c",
	"directMessage": false,
	"id": "https://akko.eepy.zone/activities/2c8f4e83-9298-4a0a-8cac-13a818978f40",
	"object": {
		"actor": "https://akko.eepy.zone/users/harper",
		"attachment": [],
		"attributedTo": "https://akko.eepy.zone/users/harper",
		"cc": ["https://akko.eepy.zone/users/harper/followers"],
		"content": "<p><span class=\"h-card\"><a class=\"u-url mention\" data-user=\"AiCSHFYUAx5ND0J2KO\" href=\"https://as2.blueb.me/users/690d0271-4147-4302-ac50-7806f3ad8f87\" rel=\"ugc\">@<span>breen</span></a></span> global</p>",
		"contentMap": {
			"en": "<p><span class=\"h-card\"><a class=\"u-url mention\" data-user=\"AiCSHFYUAx5ND0J2KO\" href=\"https://as2.blueb.me/users/690d0271-4147-4302-ac50-7806f3ad8f87\" rel=\"ugc\">@<span>breen</span></a></span> global</p>"
		},
		"context": "https://akko.eepy.zone/contexts/b2d711fe-9a05-4995-8f60-801101cf075c",
		"conversation": "https://akko.eepy.zone/contexts/b2d711fe-9a05-4995-8f60-801101cf075c",
		"id": "https://akko.eepy.zone/objects/3fad37d2-6f42-4be5-a653-a7aa93566da5",
		"published": "2024-05-24T19:53:47.430173Z",
		"sensitive": true,
		"source": {
			"content": "@breen@as2.blueb.me global",
			"mediaType": "text/x.misskeymarkdown"
		},
		"summary": "test",
		"tag": [
			{
				"href": "https://as2.blueb.me/users/690d0271-4147-4302-ac50-7806f3ad8f87",
				"name": "@breen@as2.blueb.me",
				"type": "Mention"
			}
		],
		"to": [
			"https://www.w3.org/ns/activitystreams#Public",
			"https://as2.blueb.me/users/690d0271-4147-4302-ac50-7806f3ad8f87"
		],
		"type": "Note"
	},
	"published": "2024-05-24T19:53:47.430122Z",
	"to": [
		"https://www.w3.org/ns/activitystreams#Public",
		"https://as2.blueb.me/users/690d0271-4147-4302-ac50-7806f3ad8f87"
	],
	"type": "Create"
}
```

## dm from misskey

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
	"id": "https://eepy.zone/notes/9tztaat362s902tm/activity",
	"actor": "https://eepy.zone/users/9kfweg7wmdw7fnnt",
	"type": "Create",
	"published": "2024-06-01T15:07:50.199Z",
	"object": {
		"id": "https://eepy.zone/notes/9tztaat362s902tm",
		"type": "Note",
		"attributedTo": "https://eepy.zone/users/9kfweg7wmdw7fnnt",
		"content": "<p><a href='https://as2.blueb.me/users/690d0271-4147-4302-ac50-7806f3ad8f87' class='u-url mention'>@breen@as2.blueb.me</a> 2</p>",
		"published": "2024-06-01T15:07:50.199Z",
		"to": [
			"https://as2.blueb.me/users/690d0271-4147-4302-ac50-7806f3ad8f87"
		],
		"cc": [],
		"inReplyTo": "https://eepy.zone/notes/9tzta92862s902tl",
		"attachment": [],
		"sensitive": false,
		"tag": [
			{
				"type": "Mention",
				"href": "https://as2.blueb.me/users/690d0271-4147-4302-ac50-7806f3ad8f87",
				"name": "@breen@as2.blueb.me"
			}
		]
	},
	"to": ["https://as2.blueb.me/users/690d0271-4147-4302-ac50-7806f3ad8f87"],
	"cc": []
}
```

## rsa keygen commands

`openssl genrsa -out private.pem 2048`
`openssl rsa -in private.pem -outform PEM -pubout -out public.pem`

## like

```json
{
	"@context": [
		"https://www.w3.org/ns/activitystreams",
		"https://akko.eepy.zone/schemas/litepub-0.1.jsonld",
		{ "@language": "und" }
	],
	"actor": "https://akko.eepy.zone/users/harper",
	"bcc": [],
	"bto": [],
	"cc": ["https://www.w3.org/ns/activitystreams#Public"],
	"context": "https://as2.blueb.me/notes/b50ef536-a063-41a7-85df-8aca36d877e1",
	"id": "https://akko.eepy.zone/activities/d7009131-8991-4b47-9efc-867b359ff738",
	"object": "https://as2.blueb.me/notes/b50ef536-a063-41a7-85df-8aca36d877e1",
	"to": [
		"https://akko.eepy.zone/users/harper/followers",
		"https://as2.blueb.me/users/690d0271-4147-4302-ac50-7806f3ad8f87"
	],
	"type": "Like"
}
```

undo

```json
{
	"@context": [
		"https://www.w3.org/ns/activitystreams",
		"https://akko.eepy.zone/schemas/litepub-0.1.jsonld",
		{ "@language": "und" }
	],
	"actor": "https://akko.eepy.zone/users/harper",
	"bcc": [],
	"bto": [],
	"cc": ["https://www.w3.org/ns/activitystreams#Public"],
	"id": "https://akko.eepy.zone/activities/1265026a-e239-4f06-97ec-a71fcc9e53a4",
	"object": {
		"actor": "https://akko.eepy.zone/users/harper",
		"bcc": [],
		"bto": [],
		"cc": ["https://www.w3.org/ns/activitystreams#Public"],
		"context": "https://as2.blueb.me/notes/b50ef536-a063-41a7-85df-8aca36d877e1",
		"id": "https://akko.eepy.zone/activities/8baa76a2-8da2-4cee-b6e9-2f6639d7f0d0",
		"object": "https://as2.blueb.me/notes/b50ef536-a063-41a7-85df-8aca36d877e1",
		"to": [
			"https://akko.eepy.zone/users/harper/followers",
			"https://as2.blueb.me/users/690d0271-4147-4302-ac50-7806f3ad8f87"
		],
		"type": "Like"
	},
	"to": [
		"https://akko.eepy.zone/users/harper/followers",
		"https://as2.blueb.me/users/690d0271-4147-4302-ac50-7806f3ad8f87"
	],
	"type": "Undo"
}
```

## repeat

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
	"id": "https://grimgreenfo.rest/notes/9umoznfw12gp00lz/activity",
	"actor": "https://grimgreenfo.rest/users/9sgt2c6wtxwi00xi",
	"type": "Announce",
	"published": "2024-06-17T15:26:16.940Z",
	"to": ["https://grimgreenfo.rest/users/9sgt2c6wtxwi00xi/followers"],
	"cc": [],
	"object": "https://as2.blueb.me/notes/72e8c7e6-4ef6-43e5-8d3e-09b926862f81"
}
```

## bite

```json
{
	"@context": [
		"https://www.w3.org/ns/activitystreams",
		"https://w3id.org/security/v1",
		{
			"manuallyApprovesFollowers": "as:manuallyApprovesFollowers",
			"movedTo": {
				"@id": "https://www.w3.org/ns/activitystreams#movedTo",
				"@type": "@id"
			},
			"movedToUri": "as:movedTo",
			"sensitive": "as:sensitive",
			"Hashtag": "as:Hashtag",
			"quoteUri": "fedibird:quoteUri",
			"quoteUrl": "as:quoteUrl",
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
			"_misskey_talk": "misskey:_misskey_talk",
			"_misskey_summary": "misskey:_misskey_summary",
			"isCat": "misskey:isCat",
			"fedibird": "http://fedibird.com/ns#",
			"vcard": "http://www.w3.org/2006/vcard/ns#",
			"litepub": "http://litepub.social/ns#",
			"EmojiReact": "litepub:EmojiReact",
			"EmojiReaction": "litepub:EmojiReaction",
			"Bite": "https://ns.mia.jetzt/as#Bite"
		}
	],
	"id": "https://is.blueb.me/bites/9umqynv2ky1hzqsg",
	"type": "Bite",
	"actor": "https://is.blueb.me/users/9umpru0trdkoi45u",
	"target": "https://as2.blueb.me/users/690d0271-4147-4302-ac50-7806f3ad8f87",
	"published": "2024-06-17T16:21:30.062Z",
	"to": "9umq2pnhpy0ubij2"
}
```

## like react

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
	"type": "Like",
	"id": "https://grimgreenfo.rest/likes/9umsn4i3idr20001",
	"actor": "https://grimgreenfo.rest/users/9sgt2c6wtxwi00xi",
	"object": "https://as2.blueb.me/notes/b50ef536-a063-41a7-85df-8aca36d877e1",
	"content": ":cat_attack:",
	"_misskey_reaction": ":cat_attack:",
	"tag": [
		{
			"id": "https://grimgreenfo.rest/emojis/cat_attack",
			"type": "Emoji",
			"name": ":cat_attack:",
			"updated": "2023-12-30T06:19:12.430Z",
			"icon": {
				"type": "Image",
				"mediaType": "image/gif",
				"url": "https://grimgreenfo.rest/files/9e84b135-9d3c-489d-bb60-d5dcff730028"
			}
		}
	]
}
```

# nodeinfo

```json
{
  metadata: {
    accountActivationRequired: false,
    features: [
      'pleroma_api',
      'akkoma_api',
      'mastodon_api',
      'mastodon_api_streaming',
      'polls',
      'v2_suggestions',
      'pleroma_explicit_addressing',
      'shareable_emoji_packs',
      'multifetch',
      'pleroma:api/v2/notifications:include_types_filter',
      'quote_posting',
      'editing',
      'bubble_timeline',
      'relay',
      'pleroma_emoji_reactions',
      'exposable_reactions',
      'profile_directory',
      'custom_emoji_reactions',
      'pleroma:get:main/ostatus'
    ],
    federatedTimelineAvailable: true,
    federation: {
      enabled: true,
      exclusions: false,
      mrf_hashtag: [Object],
      mrf_policies: [Array],
      mrf_simple: [Object],
      mrf_simple_info: [Object],
      quarantined_instances: [],
      quarantined_instances_info: [Object]
    },
    fieldsLimits: {
      maxFields: 20,
      maxRemoteFields: 30,
      nameLength: 512,
      valueLength: 2048
    },
    invitesEnabled: false,
    localBubbleInstances: [
      'eepy.zone',           'grimgreenfo.rest',
      'brain.d.on-t.work',   'lea.pet',
      'wetdry.world',        'lethallava.land',
      'labyrinth.zone',      'social.besties.house',
      'cats.city',           'shrimple.aagaming.me',
      'fedi.notfire.cc',     'soc.noob.quest',
      'mk.noob.quest',       'koko.micenest.xyz',
      'chadthundercock.com', 'village.elrant.team',
      'oomfie.city'
    ],
    mailerEnabled: false,
    nodeDescription: 'akkoma instance run by eepy.zone',
    nodeName: 'eepy.zone akkoma',
    pollLimits: {
      max_expiration: 31536000,
      max_option_chars: 200,
      max_options: 25,
      min_expiration: 0
    },
    postFormats: [
      'text/plain',
      'text/html',
      'text/markdown',
      'text/bbcode',
      'text/x.misskeymarkdown'
    ],
    private: false,
    privilegedStaff: false,
    publicTimelineVisibility: { bubble: true, federated: false, local: true },
    restrictedNicknames: [
      '.well-known',         '~',
      'about',               'activities',
      'api',                 'auth',
      'check_password',      'dev',
      'friend-requests',     'inbox',
      'internal',            'main',
      'media',               'nodeinfo',
      'notice',              'oauth',
      'objects',             'ostatus_subscribe',
      'pleroma',             'proxy',
      'push',                'registration',
      'relay',               'settings',
      'status',              'tag',
      'user-search',         'user_exists',
      'users',               'web',
      'verify_credentials',  'update_credentials',
      'relationships',       'search',
      'confirmation_resend', 'mfa'
    ],
    skipThreadContainment: true,
    staffAccounts: [
      'https://akko.eepy.zone/users/wep',
      'https://akko.eepy.zone/users/critter',
      'https://akko.eepy.zone/users/admin',
      'https://akko.eepy.zone/users/harper',
      'https://akko.eepy.zone/users/sneexy',
      'https://akko.eepy.zone/users/notfire'
    ],
    suggestions: { enabled: false },
    uploadLimits: {
      avatar: 2000000,
      background: 4000000,
      banner: 4000000,
      general: 16000000
    }
  },
  openRegistrations: true,
  protocols: [ 'activitypub' ],
  services: { inbound: [], outbound: [] },
  software: { name: 'akkoma', version: '3.13.1' },
  usage: {
    localPosts: 5222,
    users: { activeHalfyear: 24, activeMonth: 21, total: 23 }
  },
  version: '2.0'
}
```

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
			"_misskey_summary": "misskey:_misskey_summary",
			"isCat": "misskey:isCat",
			"firefish": "https://joinfirefish.org/ns#",
			"speakAsCat": "firefish:speakAsCat",
			"sharkey": "https://joinsharkey.org/ns#",
			"backgroundUrl": "sharkey:backgroundUrl",
			"vcard": "http://www.w3.org/2006/vcard/ns#",
			"aster": "https://blueb.me/ns#",
			"visibility": "aster:visibility",
			"hasCorrectAnswer": "aster:hasCorrectAnswer",
			"correct": "aster:correct"
		}
	],
	"id": "https://as.blueb.me/activities/2ef96fa3-f2bb-4739-bc96-aa6d1d276ece",
	"actor": "https://as.blueb.me/users/4abe905f-1435-4f60-814f-846b619f873f",
	"object": {
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
				"_misskey_summary": "misskey:_misskey_summary",
				"isCat": "misskey:isCat",
				"firefish": "https://joinfirefish.org/ns#",
				"speakAsCat": "firefish:speakAsCat",
				"sharkey": "https://joinsharkey.org/ns#",
				"backgroundUrl": "sharkey:backgroundUrl",
				"vcard": "http://www.w3.org/2006/vcard/ns#",
				"aster": "https://blueb.me/ns#",
				"visibility": "aster:visibility",
				"hasCorrectAnswer": "aster:hasCorrectAnswer",
				"correct": "aster:correct"
			}
		],
		"sensitive": false
	}
}
```

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
			"_misskey_summary": "misskey:_misskey_summary",
			"isCat": "misskey:isCat",
			"firefish": "https://joinfirefish.org/ns#",
			"speakAsCat": "firefish:speakAsCat",
			"sharkey": "https://joinsharkey.org/ns#",
			"backgroundUrl": "sharkey:backgroundUrl",
			"vcard": "http://www.w3.org/2006/vcard/ns#",
			"aster": "https://blueb.me/ns#",
			"visibility": "aster:visibility",
			"hasCorrectAnswer": "aster:hasCorrectAnswer",
			"correct": "aster:correct"
		}
	],
	"id": "https://as.blueb.me/activities/8a5f9bd6-2496-4ad6-b130-5c178c33b53b",
	"actor": "https://as.blueb.me/users/4abe905f-1435-4f60-814f-846b619f873f",
	"object": {
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
				"_misskey_summary": "misskey:_misskey_summary",
				"isCat": "misskey:isCat",
				"firefish": "https://joinfirefish.org/ns#",
				"speakAsCat": "firefish:speakAsCat",
				"sharkey": "https://joinsharkey.org/ns#",
				"backgroundUrl": "sharkey:backgroundUrl",
				"vcard": "http://www.w3.org/2006/vcard/ns#",
				"aster": "https://blueb.me/ns#",
				"visibility": "aster:visibility",
				"hasCorrectAnswer": "aster:hasCorrectAnswer",
				"correct": "aster:correct"
			}
		],
		"id": "https://as.blueb.me/notes/5dc3698d-10f3-4ad6-944b-c0be0ecac004",
		"summary": "",
		"content": "i dislike activitypub.,,. 3!",
		"published": "2024-07-11T18:26:14.899Z",
		"sensitive": false,
		"directMessage": false,
		"visibility": "unlisted",
		"to": [null],
		"cc": ["https://www.w3.org/ns/activitystreams#Public"]
	},
	"published": "2024-07-11T18:26:14.908Z"
}
```

## misskey delete

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
	"type": "Delete",
	"actor": "https://grimgreenfo.rest/users/9sgt2c6wtxwi00xi",
	"object": {
		"id": "https://grimgreenfo.rest/notes/9wf90521y83w00p8",
		"type": "Tombstone"
	},
	"published": "2024-08-01T19:44:23.982Z",
	"id": "https://grimgreenfo.rest/05774529-a6e6-4756-804f-9aec18c7a357"
}
```

# wafrn note

```json
{
	"id": "https://app.wafrn.net/fediverse/post/10720cb3-f4e2-4c88-ab1b-d995003c5106",
	"actor": "https://app.wafrn.net/fediverse/blog/blueb",
	"type": "Note",
	"published": "2024-08-10T14:31:30.000Z",
	"url": "https://app.wafrn.net/fediverse/post/10720cb3-f4e2-4c88-ab1b-d995003c5106",
	"attributedTo": "https://app.wafrn.net/fediverse/blog/blueb",
	"to": [
		"https://www.w3.org/ns/activitystreams#Public",
		"https://app.wafrn.net/fediverse/blog/blueb/followers"
	],
	"cc": [],
	"atomUri": "https://app.wafrn.net/fediverse/post/10720cb3-f4e2-4c88-ab1b-d995003c5106",
	"content": "<p>im not testing (im not)</p><p>this account has more purposes than testing</p>  <a class=\"hashtag\" data-tag=\"post\" href=\"https://app.wafrn.net/dashboard/search/im%20not%20lying\" rel=\"tag ugc\">#imNotLying</a>  <a class=\"hashtag\" data-tag=\"post\" href=\"https://app.wafrn.net/dashboard/search/i%20swear\" rel=\"tag ugc\">#iSwear</a>  <a class=\"hashtag\" data-tag=\"post\" href=\"https://app.wafrn.net/dashboard/search/i%20am%20not\" rel=\"tag ugc\">#iAmNot</a>",
	"attachment": [],
	"tag": [
		{
			"type": "Hashtag",
			"name": "#imNotLying",
			"href": "https://app.wafrn.net/dashboard/search/im%20not%20lying"
		},
		{ "type": "WafrnHashtag", "name": "im not lying" },
		{
			"type": "Hashtag",
			"name": "#iSwear",
			"href": "https://app.wafrn.net/dashboard/search/i%20swear"
		},
		{ "type": "WafrnHashtag", "name": "i swear" },
		{
			"type": "Hashtag",
			"name": "#iAmNot",
			"href": "https://app.wafrn.net/dashboard/search/i%20am%20not"
		},
		{ "type": "WafrnHashtag", "name": "i am not" }
	],
	"replies": {
		"id": "https://app.wafrn.net/fediverse/post/10720cb3-f4e2-4c88-ab1b-d995003c5106/replies",
		"type": "Collection",
		"first": {
			"type": "CollectionPage",
			"partOf": "https://app.wafrn.net/fediverse/post/10720cb3-f4e2-4c88-ab1b-d995003c5106/replies",
			"items": []
		}
	},
	"@context": [
		"https://www.w3.org/ns/activitystreams",
		"https://app.wafrn.net/contexts/litepub-0.1.jsonld"
	]
}
```

```json
{
	"@context": [
		"https://www.w3.org/ns/activitystreams",
		{
			"ostatus": "http://ostatus.org#",
			"atomUri": "ostatus:atomUri",
			"inReplyToAtomUri": "ostatus:inReplyToAtomUri",
			"conversation": "ostatus:conversation",
			"sensitive": "as:sensitive",
			"toot": "http://joinmastodon.org/ns#",
			"votersCount": "toot:votersCount",
			"blurhash": "toot:blurhash",
			"focalPoint": { "@container": "@list", "@id": "toot:focalPoint" }
		}
	]
}
```

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
			"vcard": "http://www.w3.org/2006/vcard/ns#",
			"aster": "https://blueb.me/ns#",
			"visibility": "aster:visibility",
			"hasCorrectAnswer": "aster:hasCorrectAnswer",
			"correct": "aster:correct"
		}
	],
	"type": "Delete",
	"actor": "https://eepy.zone/users/9kfweg7wmdw7fnnt",
	"object": {
		"id": "https://eepy.zone/notes/9wwr6ccv0pvb03dr",
		"type": "Tombstone"
	},
	"published": "2024-08-14T01:45:53.340Z",
	"id": "https://eepy.zone/29022189-4198-4a80-aba7-1935bdbdd588"
}
```

```json
{
	"@context": "https://www.w3.org/ns/activitystreams",
	"id": "https://mastodon.social/users/duckhoi#delete",
	"type": "Delete",
	"actor": "https://mastodon.social/users/duckhoi",
	"to": ["https://www.w3.org/ns/activitystreams#Public"],
	"object": "https://mastodon.social/users/duckhoi",
	"signature": {
		"type": "RsaSignature2017",
		"creator": "https://mastodon.social/users/duckhoi#main-key",
		"created": "2024-08-14T01:46:42Z",
		"signatureValue": "murPnkuAS2LYivxBRbMZf9rQsDggCE+wMQ+a1qNh/kLIabDWg+Jbhsqb8OUDrE15osLc2Z7xapTHEZ94fqHsJInEa26meUpjtf3DfmQ87FVv8CVn5COkiaTZCgDDfDz0U3E/Aam0LpYY2NqPbpdmp9l4qXYQAtaNq1i9/9WU4VrilkF5eGzAYNFVO4y30lYspUBwC+r0vPGEHWqdzb1UBmHqLT87TZcnlBVXrNa2biP9Zr5MoQ4f30/oRE+LL+CCXJpq0kPK5w8agggk7BX0L3+gmrLkXLz0U+yVwCbkwDefYfEWBALu12AxJErUEEr1EWkZUPclBvIniaxoDqVlfg=="
	}
}
```

```json
{
	"@context": [
		"https://www.w3.org/ns/activitystreams",
		{ "ostatus": "http://ostatus.org#", "atomUri": "ostatus:atomUri" }
	],
	"id": "https://mastodon.social/users/ihateblueb/statuses/112957916271489657#delete",
	"type": "Delete",
	"actor": "https://mastodon.social/users/ihateblueb",
	"to": ["https://www.w3.org/ns/activitystreams#Public"],
	"object": {
		"id": "https://mastodon.social/users/ihateblueb/statuses/112957916271489657",
		"type": "Tombstone",
		"atomUri": "https://mastodon.social/users/ihateblueb/statuses/112957916271489657"
	},
	"signature": {
		"type": "RsaSignature2017",
		"creator": "https://mastodon.social/users/ihateblueb#main-key",
		"created": "2024-08-14T02:04:04Z",
		"signatureValue": "XK5OGwXOBadVaLF0E5GgGR44l0Zw6O+I1vwd0bomOVcWf4VMLoqBAQ57qwKyDoELluRdVbgRKzekYKSbFuoXMANpVsO0DR073FsWtr2NEATEva6oHLVun9qDaG/Sjv7h6JcOtbLIFEwVy/D+3C5AI2YobC2rSk6Ss5DUgxoEiffSISTrXko/GkqCBFLGXcoZ+tU55GxBmSfesZ/o7kr8isnhoclGEahQs9buSkxdjuNv0kJLbKW8Zzn0mVbEj99C8uYGQzBWIiY/M/r1eJAD7PqzwW2qgGX+1bGj2VfcJxzNBGF/i4ZC0cHoT/abViEdH2BxGr/nQSSGr98KKrP6VA=="
	}
}
```

# quote note

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
			"vcard": "http://www.w3.org/2006/vcard/ns#",
			"aster": "https://blueb.me/ns#",
			"visibility": "aster:visibility",
			"hasCorrectAnswer": "aster:hasCorrectAnswer",
			"correct": "aster:correct"
		}
	],
	"id": "https://eepy.zone/notes/9wxz43nb3ctk01ha",
	"type": "Note",
	"attributedTo": "https://eepy.zone/users/9tinc25vpg4n004w",
	"content": "<p><span>Wait have you guys seen this<br><br>RE: </span><a href=\"https://eepy.zone/notes/0ojy918h4jw300g8\">https://eepy.zone/notes/0ojy918h4jw300g8</a></p>",
	"_misskey_content": "Wait have you guys seen this",
	"source": {
		"content": "Wait have you guys seen this",
		"mediaType": "text/x.misskeymarkdown"
	},
	"_misskey_quote": "https://eepy.zone/notes/0ojy918h4jw300g8",
	"quoteUrl": "https://eepy.zone/notes/0ojy918h4jw300g8",
	"quoteUri": "https://eepy.zone/notes/0ojy918h4jw300g8",
	"published": "2024-08-14T22:14:33.335Z",
	"visibility": "public",
	"to": ["https://www.w3.org/ns/activitystreams#Public"],
	"cc": ["https://eepy.zone/users/9tinc25vpg4n004w/followers"],
	"inReplyTo": null,
	"attachment": [],
	"sensitive": false,
	"tag": []
}
```

# user

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
			"vcard": "http://www.w3.org/2006/vcard/ns#",
			"aster": "https://blueb.me/ns#",
			"visibility": "aster:visibility",
			"hasCorrectAnswer": "aster:hasCorrectAnswer",
			"correct": "aster:correct"
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
	"name": "sleepy harper",
	"summary": "<p><div><i><b>hi im harper</b></i> <i>​:waving:​</i><span><br></span><i><small><b>yaaaaawwwnnnn</b></small></i></div><span><br>minor!!!! <br><br>mediocre programmer, silly creature, skyward sword and half life enjoyer, activitpub hater<br><br>i am writing my own fedi software despite my hatred, check that out </span><a href=\"https://git.gay/blueb-aster\">here</a><span> if you like questionable code quality and high quality json-ld<br>my account there is </span><a href=\"https://eepy.zone/@blueb@as.eepy.zone\" class=\"u-url mention\">@blueb@as.eepy.zone</a><span>, you can follow it if you like delayed queue jobs and half cooked activities<br><br>feel free to follow request. i accept most it's just to make sure i dont federate followers only posts with people im not fully aware of :3<br><br>if i do something wrong or bother you, let me know </span>​:happypete:​<span> <br><br>alt </span><a href=\"https://eepy.zone/@blueb@grimgreenfo.rest\" class=\"u-url mention\">@blueb@grimgreenfo.rest</a><span><br>alt if my server is down </span><a href=\"https://eepy.zone/@blueb@labyrinth.zone\" class=\"u-url mention\">@blueb@labyrinth.zone</a><span><br>private </span><a href=\"https://eepy.zone/@critter@akko.eepy.zone\" class=\"u-url mention\">@critter@akko.eepy.zone</a><span><br><br>cute gay cat :3 -> </span><a href=\"https://eepy.zone/@notfire@akko.eepy.zone\" class=\"u-url mention\">@notfire@akko.eepy.zone</a><span> <br><br></span><div><i>⚠️ warning: sometimes i like to get a little silly. ⚠️</i></div><div><i>if you can see this, you should look at my profile on my instance. it'll look cooler..</i></div></p>",
	"_misskey_summary": "<center>$[x2 **hi im harper**] $[spin :waving:]\n$[position.y=-0.4 <small>**yaaaaawwwnnnn**</small>]</center>\n\nminor!!!! \n\nmediocre programmer, silly creature, skyward sword and half life enjoyer, activitpub hater\n\ni am writing my own fedi software despite my hatred, check that out [here](https://git.gay/blueb-aster) if you like questionable code quality and high quality json-ld\nmy account there is @blueb@as.eepy.zone, you can follow it if you like delayed queue jobs and half cooked activities\n\nfeel free to follow request. i accept most it's just to make sure i dont federate followers only posts with people im not fully aware of :3\n\nif i do something wrong or bother you, let me know :happypete: \n\nalt @blueb@grimgreenfo.rest\nalt if my server is down @blueb@labyrinth.zone\nprivate @critter@akko.eepy.zone\n\ncute gay cat :3 -> @notfire@akko.eepy.zone \n\n\n<center>$[fg.color=e63939 ⚠️ warning: sometimes i like to get a little silly. ⚠️]</center>\n<center>\n$[scale.y=0,x=0 if you can see this, you should look at my profile on my instance. it'll look cooler..]</center>",
	"icon": {
		"type": "Image",
		"url": "https://media.eepy.zone/mkmedia/281976de-098d-48ae-8c00-30f7c4f6cc5d.webp",
		"sensitive": false,
		"name": null
	},
	"image": {
		"type": "Image",
		"url": "https://media.eepy.zone/mkmedia/f4c9698e-a8c2-400e-9761-7ab6303d613c.webp",
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
		},
		{
			"id": "https://eepy.zone/emojis/happypete",
			"type": "Emoji",
			"name": ":happypete:",
			"updated": "2024-04-10T12:52:46.330Z",
			"icon": {
				"type": "Image",
				"mediaType": "image/png",
				"url": "https://eepy.zone/files/c15096af-626b-4a4c-aabf-1d028a7172d0"
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
			"value": "<a href=\"https://harper.eepy.zone/\" rel=\"me nofollow noopener\" target=\"_blank\">https://harper.eepy.zone/</a>"
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
			"name": "pronouns",
			"value": "it/she/he :3 (https://prns.cc/bazmp)"
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
			"vcard": "http://www.w3.org/2006/vcard/ns#",
			"aster": "https://harper.eepy.zone/ns#",
			"visibility": "aster:visibility",
			"hasCorrectAnswer": "aster:hasCorrectAnswer",
			"correct": "aster:correct"
		}
	],
	"type": "Undo",
	"id": "https://eepy.zone/likes/9x6su7jlu8m30004/undo",
	"actor": "https://eepy.zone/users/9kfweg7wmdw7fnnt",
	"object": {
		"type": "Like",
		"id": "https://eepy.zone/likes/9x6su7jlu8m30004",
		"actor": "https://eepy.zone/users/9kfweg7wmdw7fnnt",
		"object": "https://as.eepy.zone/notes/c92303ef-048b-462d-9821-01f063f877b0"
	},
	"published": "2024-08-21T02:29:06.677Z"
}
```

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
			"_misskey_summary": "misskey:_misskey_summary",
			"isCat": "misskey:isCat",
			"firefish": "https://joinfirefish.org/ns#",
			"speakAsCat": "firefish:speakAsCat",
			"sharkey": "https://joinsharkey.org/ns#",
			"backgroundUrl": "sharkey:backgroundUrl",
			"vcard": "http://www.w3.org/2006/vcard/ns#",
			"aster": "https://harper.eepy.zone/ns#",
			"visibility": "aster:visibility",
			"hasCorrectAnswer": "aster:hasCorrectAnswer",
			"correct": "aster:correct"
		}
	],
	"id": "https://as.eepy.zone/activities/35574f92-fbc8-477a-883d-92331a27877f/undo",
	"type": "Undo",
	"object": {
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
				"_misskey_summary": "misskey:_misskey_summary",
				"isCat": "misskey:isCat",
				"firefish": "https://joinfirefish.org/ns#",
				"speakAsCat": "firefish:speakAsCat",
				"sharkey": "https://joinsharkey.org/ns#",
				"backgroundUrl": "sharkey:backgroundUrl",
				"vcard": "http://www.w3.org/2006/vcard/ns#",
				"aster": "https://harper.eepy.zone/ns#",
				"visibility": "aster:visibility",
				"hasCorrectAnswer": "aster:hasCorrectAnswer",
				"correct": "aster:correct"
			}
		],
		"id": "https://as.eepy.zone/activities/35574f92-fbc8-477a-883d-92331a27877f",
		"type": "Like",
		"actor": "https://as.eepy.zone/users/c303c3bb-6c72-4267-a541-01675d53a939",
		"object": "https://eepy.zone/notes/9x6pvowiryty00ad",
		"context": "https://eepy.zone/notes/9x6pvowiryty00ad",
		"to": [
			"https://as.eepy.zone/users/c303c3bb-6c72-4267-a541-01675d53a939/followers",
			null
		]
	},
	"published": "2024-08-21T02:40:38.048Z"
}
```
