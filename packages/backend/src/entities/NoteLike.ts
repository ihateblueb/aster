import { Notes } from './Note.js';
import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class NotesLike {
	@PrimaryColumn()
	id: string;

	@Column()
	ap_id: string;

	@OneToOne(() => Notes, (note) => note)
	note: Notes;

	@Column({ nullable: true })
	created_at: string;

	@Column({ nullable: true })
	user: string;
}
