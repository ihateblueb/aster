import typeorm, {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryColumn
} from 'typeorm';

import { Emoji } from './Emoji.js';
import { Note } from './Note.js';
import { User } from './User.js';

@Entity()
export class NoteReact {
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
	emojiId: string;

	@ManyToOne(() => Emoji, (emoji) => emoji, {
		onDelete: 'CASCADE',
		nullable: true
	})
	@JoinColumn({ name: 'emojiId' })
	emoji: typeorm.Relation<Emoji>;

	@Column({ nullable: true })
	content: string;

	@Column({ select: false })
	noteId: string;

	@ManyToOne(() => Note, (note) => note.reactions, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'noteId' })
	note: typeorm.Relation<Note>;

	@Column()
	createdAt: string;
}
