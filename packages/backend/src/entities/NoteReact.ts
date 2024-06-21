import { Emoji } from './Emoji.js';
import { Note } from './Note.js';
import { User } from './User.js';
import { Column, Entity, Relation, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class NoteReact {
	@PrimaryColumn()
	id: string;

	@Column()
	ap_id: string;

	@OneToOne(() => Note, (note) => note)
	note: Relation<Note>;

	@Column()
	created_at: string;

	// empty if like
	@OneToOne(() => Emoji, (emoji) => emoji)
	emoji: Relation<Emoji> | null;

	@OneToOne(() => User, (user) => user)
	user: Relation<User>;
}
