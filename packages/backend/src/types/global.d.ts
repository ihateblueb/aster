type where = object;

type GenericId = string; // local ids
type ApId = string;

type RelationshipType = 'follow' | 'block' | 'mute';
type NotificationType =
	| 'like'
	| 'repeat'
	| 'mention'
	| 'follow'
	| 'brokenFollow'
	| 'report';
