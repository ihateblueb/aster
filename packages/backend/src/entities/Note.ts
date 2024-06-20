import { NoteEdit } from './NoteEdit.js';
import { User } from './User.js';
import {
	Column,
	Entity,
	OneToOne,
	ManyToOne,
	PrimaryColumn,
	Relation
} from 'typeorm';

@Entity()
export class Note {
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

	@OneToOne(() => User, (user) => user)
	author: Relation<User> | null;

	@Column({ default: false })
	local: boolean;

	@Column({ nullable: true })
	cw: string;

	@Column()
	content: string;

	@ManyToOne(() => NoteEdit, (edit) => edit)
	edits: NoteEdit[] | null;

	@OneToOne(() => Note, (note) => note)
	original_note: Note;
}
