import { User } from '../entities/User.js';

export default class ApiNote {
	id: string;
	ap_id: string;
	created_at: string;
	visibility: string;

	replying_to?: ApiNote;
	author: object;
	instance: object;

	local: boolean;
	cw?: string;
	content: string;

	attachments?: any[];
	emojis?: any[];
	reactions?: any[];

	likes?: {};

	constructor(
		grabbedNote,
		grabbedAuthor,
		grabbedInstance?,
		grabbedAttachments?,
		grabbedEmojis?,
		grabbedReactions?,
		grabbedLikes?,
		grabbedReplyingTo?,
		grabbedReplyingToAuthor?
	) {
		this.id = grabbedNote.id;
		this.ap_id = grabbedNote.ap_id;
		this.created_at = grabbedNote.created_at;
		this.visibility = grabbedNote.visibility;
		this.replying_to = grabbedNote.replying_to;
		this.author = grabbedAuthor;
		this.instance = grabbedInstance;
		this.local = grabbedNote.local;
		this.cw = grabbedNote.cw;
		this.content = grabbedNote.content;
		this.attachments =
			grabbedAttachments && grabbedAttachments.length > 0
				? grabbedAttachments
				: null;
		this.emojis =
			grabbedEmojis && grabbedEmojis.length > 0 ? grabbedEmojis : null;

		var sortedReactions = [];

		if (grabbedReactions) {
			grabbedReactions.forEach(async (reaction) => {
				if (sortedReactions.find((e) => e.id === reaction.emoji.id)) {
					sortedReactions.find(
						(e) => e.id === reaction.emoji.id
					).count += 1;
					sortedReactions
						.find((e) => e.id === reaction.emoji.id)
						.from.push(reaction.user);
				} else {
					sortedReactions.push({
						id: reaction.emoji.id,
						url: reaction.emoji.url,
						name: reaction.emoji.name,
						host: reaction.emoji.host,
						local: reaction.emoji.local,
						count: 1,
						from: [reaction.user]
					});
				}
			});
		}

		this.reactions =
			sortedReactions && sortedReactions.length > 0
				? sortedReactions
				: null;

		var sortedLikes = {
			count: 0,
			from: []
		};

		if (grabbedLikes) {
			for (const like of grabbedLikes) {
				sortedLikes.count++;
				sortedLikes.from.push(like.user);
			}
		}

		this.likes = sortedLikes ? sortedLikes : null;
	}

	build() {
		return this;
	}
}
