import { NoteEdit } from './NoteEdit.js';
import { NoteReact } from './NoteReact.js';
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

	@OneToOne(() => Note, (note) => note)
	replying_to: Relation<Note> | null;

	@OneToOne(() => User, (user) => user)
	author: Relation<User> | null;

	@Column({ default: false })
	local: boolean;

	@Column({ nullable: true })
	cw: string;

	@Column()
	content: string;

	@ManyToOne(() => NoteEdit, (edit) => edit)
	edits: Relation<NoteEdit[]> | null;

	@ManyToOne(() => Note, (note) => note.replying_to)
	replies: Relation<Note[]> | null;

	@ManyToOne(() => NoteReact, (react) => react)
	reactions: Relation<NoteReact[]> | null;

	@OneToOne(() => Note, (note) => note)
	original_note: Relation<Note>;
}
