import typeorm, {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryColumn
} from 'typeorm';

import { NoteLike } from './NoteLike.js';
import { NoteReact } from './NoteReact.js';
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

	@Column({ nullable: true })
	content: string;

	@Column({ array: true, nullable: true })
	emojis: string;

	@Column({ default: 'public' })
	visibility: string;

	@Column({ array: true, nullable: true })
	to: string;

	@Column()
	createdAt: string;

	@Column({ nullable: true })
	updatedAt: string;

	@Column({ select: false, nullable: true })
	pollId: string;

	@OneToOne(() => Poll, (poll) => poll, {
		onDelete: 'CASCADE',
		nullable: true
	})
	@JoinColumn({ name: 'pollId' })
	poll: typeorm.Relation<Poll>;

	@Column({ array: true, nullable: true })
	attachments: string;

	@Column({ array: true, select: false, nullable: true })
	likeIds: string;

	@OneToMany(() => NoteLike, (noteLike) => noteLike.note, {
		onDelete: 'CASCADE',
		nullable: true
	})
	@JoinColumn({ name: 'likeIds' })
	likes: typeorm.Relation<NoteLike>;

	@Column({ array: true, select: false, nullable: true })
	reactionIds: string;

	@OneToMany(() => NoteReact, (noteReact) => noteReact.note, {
		onDelete: 'CASCADE',
		nullable: true
	})
	@JoinColumn({ name: 'reactionIds' })
	reactions: typeorm.Relation<NoteReact>;

	@Column({ array: true, select: false, nullable: true })
	repeatIds: string;

	@OneToMany(() => Note, (Note) => Note.repeat, {
		onDelete: 'CASCADE',
		nullable: true
	})
	@JoinColumn({ name: 'repeatIds' })
	repeats: typeorm.Relation<Note>;
}
