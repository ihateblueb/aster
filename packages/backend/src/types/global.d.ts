type where = object;

type GenericId = string;

type AsLink = string;
// equivalent to typeorm's ObjectLiteral
type AsObject = {
	/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	[key: string]: any;
};

type ApObject = AsObject;
type ApId = AsLink;
type Inbox = AsLink;

type Visibility = 'public' | 'unlisted' | 'followers' | 'direct';
type RelationshipType = 'follow' | 'block' | 'mute';
type NotificationType =
	| 'like'
	| 'react'
	| 'repeat'
	| 'mention'
	| 'follow'
	| 'acceptedFollow'
	| 'brokenFollow'
	| 'report'
	| 'bite';
