import typeorm, {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryColumn
} from 'typeorm';

import { User } from './User.js';
import { Poll } from './Poll.js';

// todo: move this note

/* why typeorm.Relation<>?
 * see https://github.com/typeorm/typeorm/issues/9894
 * importing Relation directly does not work!
 *
 * also note: only one should be in the ManyToOne relations,
 * OneToOne makes the column unique which would mean only one
 * note could exist per user/per note being replied to
 * */

@Entity()
export class Note {
	@PrimaryColumn({ unique: true })
	id: string;

	@Column({ unique: true })
	apId: string;

	@Column({ select: false })
	userId: string;

	@ManyToOne(() => User, (user) => user, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'userId' })
	user: typeorm.Relation<User>;

	@Column({ select: false, nullable: true })
	replyingToId: string;

	@ManyToOne(() => Note, (note) => note, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'replyingToId' })
	replyingTo: typeorm.Relation<Note>;

	@Column({ select: false, nullable: true })
	pollId: string;

	@OneToOne(() => Poll, (poll) => poll, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'pollId' })
	poll: typeorm.Relation<Poll>;

	@Column({ nullable: true })
	cw: string;

	@Column()
	content: string;

	@Column({ default: 'public' })
	visibility: string;

	@Column()
	createdAt: string;

	@Column({ nullable: true })
	updatedAt: string;
}
