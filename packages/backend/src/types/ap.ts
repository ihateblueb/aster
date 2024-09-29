type ApId = string | URL;

type ApType =
	| 'Collection'
	| 'OrderedCollection'
	| 'Accept'
	| 'Add'
	| 'Announce'
	| 'Bite'
	| 'Block'
	| 'Create'
	| 'Delete'
	| 'Dislike'
	| 'EmojiReact'
	| 'Flag'
	| 'Follow'
	| 'Like'
	| 'Mood'
	| 'Move'
	| 'Question'
	| 'Reject'
	| 'Read'
	| 'Remove'
	| 'Undo'
	| 'Update'
	| 'Application'
	| 'Organization'
	| 'Person'
	| 'Service'
	| 'Article'
	| 'Note'
	| 'Tombstone'
	| string;

type ApObject = {
	type: ApType;
};
