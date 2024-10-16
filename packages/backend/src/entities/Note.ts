import typeorm, {
	Column,
	Entity,
	JoinColumn,
	ManyToMany,
	ManyToOne,
	OneToOne,
	PrimaryColumn
} from 'typeorm';

import { User } from './User.js';
import { Poll } from './Poll.js';
import { DriveFile } from './DriveFile.js';

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

	@Column({ nullable: true })
	cw: string;

	@Column()
	content: string;

	@Column({ default: 'public' })
	visibility: string;

	@Column({ select: false, nullable: true })
	pollId: string;

	@OneToOne(() => Poll, (poll) => poll, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'pollId' })
	poll: typeorm.Relation<Poll>;

	/* TODO: never done a ManyToMany in this way, is this right and the correct way to join?	
	
	@Column({ array: true, select: false, nullable: true })
	driveFileIds: string;

	@ManyToMany(() => DriveFile, (driveFile) => driveFile, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'driveFileIds' })
	driveFiles: typeorm.Relation<DriveFile>;

	TODO (later): add emojis relation for emojis in post content
	*/

	// todo: NoteLike, NoteReact, Note relations?
	// Note relations may have potential to loop weirdly if not careful

	@Column()
	createdAt: string;

	@Column({ nullable: true })
	updatedAt: string;
}
