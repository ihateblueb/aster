import { Emoji } from './Emoji.js';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class NotesReact {
	@PrimaryColumn()
	id: string;

	@Column()
	ap_id: string;

	@Column()
	note: string;

	@Column()
	created_at: string;

	@ManyToOne(() => Emoji, (emoji) => emoji)
	emoji: Emoji[] | null;

	@Column()
	user: string;
}
