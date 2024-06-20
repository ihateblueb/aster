import { Emojis } from './Emoji.js';import { Notes } from './Note.js';
import { Column, Entity,  ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';


@Entity()
export class NotesReact {
	@PrimaryColumn()
	id: string;

	@Column()
	ap_id: string;

	@OneToOne(() => Notes, (note) => note)
	note: Notes;

	@Column({ nullable: true })
	created_at: string;

	@ManyToOne(() => Emojis, (emoji) => emoji)
	emoji: Emojis[] | null;

	@Column({ nullable: true })
	user: string;
}
