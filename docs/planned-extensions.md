# Aster Planned Extensions to ActivityPub

## `aster:Status`

Extends `Activity`

Like an unlisted note, the user's followers are in `cc` and public is in `to`. Anyone could view it, but it's directed towards the user's followers.

How should this be implemented?

```json
{
	"@context": [
		"https://www.w3.org/ns/activitystreams",
		"https://w3id.org/security/v1"
	],
	"id": "https://as2.blueb.me/statuses/f8eab61f-6488-4673-b48e-a1eb529addbc",
	"type": "Status",
	"attributedTo": "https://as2.blueb.me/users/690d0271-4147-4302-ac50-7806f3ad8f87",
	"content": "im silly :3c",
	"source": {
		"content": "im silly :3c",
		"mediaType": "text/x.misskeymarkdown"
	},
	"published": "2024-05-23T09:38:58Z",
	"visibility": "public",
	"to": ["https://www.w3.org/ns/activitystreams#Public"],
	"cc": "https://as2.blueb.me/users/690d0271-4147-4302-ac50-7806f3ad8f87/followers",
	"inReplyTo": null
}
```
