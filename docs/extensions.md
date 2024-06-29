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

## `aster:CorrectAnswer` and `aster:HasCorrectAnswer`

Extends `Question`

Not yet implemented, example is from Lockpick.

```json
{
	"id": "https://eepy.zone/notes/9v3syg7f92m201b2",
	"type": "Question",
	"attributedTo": "https://eepy.zone/users/9kfweg7wmdw7fnnt",
	"content": "<p>test poll ignore me</p>",
	"published": "2024-06-29T14:49:24.363Z",
	"visibility": "public",
	"to": ["https://www.w3.org/ns/activitystreams#Public"],
	"cc": ["https://eepy.zone/users/9kfweg7wmdw7fnnt/followers"],
	"inReplyTo": null,
	"attachment": [],
	"sensitive": false,
	"tag": [],
	"endTime": null,
	"hasCorrectAnswer": true,
	"oneOf": [
		{
			"type": "Note",
			"name": "option 1",
			"correct": true,
			"replies": { "type": "Collection", "totalItems": 1 }
		},
		{
			"type": "Note",
			"name": "option 2",
			"correct": false,
			"replies": { "type": "Collection", "totalItems": 2 }
		}
	]
}
```
