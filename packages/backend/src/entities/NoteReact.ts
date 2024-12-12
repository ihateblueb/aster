import typeorm, {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryColumn
} from 'typeorm';

import { Emoji } from './Emoji.js';
import { Note } from './Note.js';
import { User } from './User.js';

@Entity()
export class NoteReact {
	@PrimaryColumn({ unique: true })
	id: string;

	@Column({ select: false })
	userId: string;

	@ManyToOne(() => User, (user) => user, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'userId' })
	user: typeorm.Relation<User>;

	@Column({ select: false })
	emojiId: string;

	@ManyToOne(() => Emoji, (emoji) => emoji, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'Emoji' })
	emoji: typeorm.Relation<Emoji>;

	@Column({ select: false })
	noteId: string;

	@OneToOne(() => Note, (note) => note, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'noteId' })
	note: typeorm.Relation<Note>;

	@Column()
	createdAt: string;
}
