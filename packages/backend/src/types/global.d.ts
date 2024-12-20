// These types are more so to improve readability of code and suggestions.

type where = object;

type GenericId = string;
type ApId = string;
// equivalent to typeorm's ObjectLiteral
type ApObject = {
	/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	[key: string]: any;
};

type Visibility = 'public' | 'unlisted' | 'followers' | 'direct';
type RelationshipType = 'follow' | 'block' | 'mute';
type NotificationType =
	| 'like'
	| 'repeat'
	| 'mention'
	| 'follow'
	| 'acceptedFollow'
	| 'brokenFollow'
	| 'report';
