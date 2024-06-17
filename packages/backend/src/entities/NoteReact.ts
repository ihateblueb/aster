import { Emojis } from './Emoji.js';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class NotesReact {
	@PrimaryColumn()
	id: string;

	@Column()
	ap_id: string;

	@Column({ nullable: true })
	note: string;

	@Column({ nullable: true })
	created_at: string;

	@ManyToOne(() => Emojis, (emoji) => emoji)
	emoji: Emojis[] | null;

	@Column({ nullable: true })
	user: string;
}
