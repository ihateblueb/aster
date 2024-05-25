# Aster Extensions to ActivityPub

## `aster:Visibility` (implemented in Aster)

Extends `Note`

Options:

-   public (anyone can view)
-   unlisted (anyone can view, hidden from local/global timelines)
-   followers (only followers of actor can view)
-   direct (only users mentioned may view)

Example from Aster
(see `packages/backend/src/routes/ap/note.ts`)

```json
{
	"@context": [
		"https://www.w3.org/ns/activitystreams",
		"https://w3id.org/security/v1"
	],
	"id": "https://as2.blueb.me/notes/aee066ac-a4e8-4442-8c58-e981cded9964",
	"type": "Note",
	"attributedTo": "https://as2.blueb.me/users/690d0271-4147-4302-ac50-7806f3ad8f87",
	"content": "this post... this post. yea.",
	"source": {
		"content": "this post... this post. yea.",
		"mediaType": "text/x.misskeymarkdown"
	},
	"published": "2024-05-23T09:38:58Z",
	"visibility": "public",
	"to": ["https://www.w3.org/ns/activitystreams#Public"],
	"cc": "https://as2.blueb.me/users/690d0271-4147-4302-ac50-7806f3ad8f87/followers",
	"inReplyTo": null
}
```
