import { NotesEdit } from './NoteEdit.js';
import { Users } from './User.js';
import {
	Column,
	Entity,
	OneToOne,
	ManyToOne,
	PrimaryColumn,
	Relation
} from 'typeorm';

@Entity()
export class Notes {
	@PrimaryColumn()
	id: string;

	@Column({ nullable: true })
	ap_id: string;

	@Column()
	created_at: string;

	@Column({ default: 'public' })
	visibility: string;

	@Column({ nullable: true })
	replying_to: string;

	@OneToOne(() => Users, (user) => user)
	author: Relation<Users> | null;

	@Column({ default: false })
	local: boolean;

	@Column({ nullable: true })
	cw: string;

	@Column()
	content: string;

	@ManyToOne(() => NotesEdit, (edit) => edit)
	edits: NotesEdit[] | null;

	@OneToOne(() => Notes, (note) => note)
	original_note: Notes;
}
