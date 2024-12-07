import typeorm, {
	Column,
	Entity,
	JoinColumn,
	ManyToMany,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryColumn
} from 'typeorm';

import { DriveFile } from './DriveFile.js';
import { NoteLike } from './NoteLike.js';
import { Poll } from './Poll.js';
import { User } from './User.js';

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
		onDelete: 'CASCADE',
		nullable: true
	})
	@JoinColumn({ name: 'replyingToId' })
	replyingTo: typeorm.Relation<Note>;

	@Column({ select: false, nullable: true })
	repeatId: string;

	@ManyToOne(() => Note, (note) => note, {
		onDelete: 'CASCADE',
		nullable: true
	})
	@JoinColumn({ name: 'repeatId' })
	repeat: typeorm.Relation<Note>;

	@Column({ nullable: true })
	cw: string;

	@Column()
	content: string;

	@Column({ default: 'public' })
	visibility: string;

	@Column({ select: false, nullable: true })
	pollId: string;

	@OneToOne(() => Poll, (poll) => poll, {
		onDelete: 'CASCADE',
		nullable: true
	})
	@JoinColumn({ name: 'pollId' })
	poll: typeorm.Relation<Poll>;

	/* TODO: never done a ManyToMany in this way, is this right and the correct way to join?

	@Column({ array: true, select: false, nullable: true })
	driveFileIds: string;

	@ManyToMany(() => DriveFile, (driveFile) => driveFile, {
		onDelete: 'CASCADE',
		nullable: true
	})
	@JoinColumn({ name: 'driveFileIds' })
	driveFiles: typeorm.Relation<DriveFile>;

	TODO (later): add emojis relation for emojis in post content
	*/

	@Column({ array: true, select: false, nullable: true })
	likeIds: string;

	@OneToMany(() => NoteLike, (noteLike) => noteLike.note, {
		onDelete: 'CASCADE',
		nullable: true
	})
	@JoinColumn({ name: 'likeIds' })
	likes: typeorm.Relation<NoteLike>;

	@Column({ array: true, select: false, nullable: true })
	repeatIds: string;

	@OneToMany(() => Note, (Note) => Note.repeat, {
		onDelete: 'CASCADE',
		nullable: true
	})
	@JoinColumn({ name: 'repeatIds' })
	repeats: typeorm.Relation<Note>;

	@Column({ array: true, select: false, nullable: true })
	toIds: string;

	@OneToMany(() => User, (User) => User, {
		onDelete: 'CASCADE',
		nullable: true
	})
	@JoinColumn({ name: 'toIds' })
	to: typeorm.Relation<User>;

	@Column()
	createdAt: string;

	@Column({ nullable: true })
	updatedAt: string;
}
