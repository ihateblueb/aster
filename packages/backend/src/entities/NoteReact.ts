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

	@Column()
	note: string;

	@Column()
	created_at: string;

	// empty if like
	@OneToOne(() => Emoji, (emoji) => emoji)
	emoji: Relation<Emoji> | null;

	@Column()
	user: string;
}
