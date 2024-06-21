import { Emoji } from './Emoji.js';
import { Note } from './Note.js';
import { User } from './User.js';
import { Column, Entity, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class NoteReact {
	@PrimaryColumn()
	id: string;

	@Column()
	ap_id: string;

	@OneToOne(() => Note, (note) => note)
	note: Note;

	@Column()
	created_at: string;

	// empty if like 
	@OneToOne(() => Emoji, (emoji) => emoji)
	emoji: Emoji | null;

	@OneToOne(() => User, (user) => user)
	user: User;
}
