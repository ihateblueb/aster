import { Notes } from './Note.js';
import { Column, Entity, OneToOne, PrimaryColumn, Relation } from 'typeorm';

@Entity()
export class NotesEdit {
	@PrimaryColumn()
	id: string;

	@OneToOne(() => Notes, (note) => note)
	note: Relation<Notes>;

	@Column({ nullable: true })
	created_at: string;

	@Column('text', { array: true, nullable: true })
	cw: string[];

	@Column({ nullable: true })
	content: string;

	@Column('text', { array: true, nullable: true })
	permissions: string[];
}
