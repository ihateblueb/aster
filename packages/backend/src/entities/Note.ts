import { User } from './User.js';
import {
	Column,
	Entity,
	PrimaryColumn,
	OneToOne,
	JoinColumn,
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

	@Column()
	author: string;

	@Column({ default: false })
	local: boolean;

	@Column({ nullable: true })
	cw: string;

	@Column()
	content: string;

	@Column({ nullable: true })
	edits: string;

	@Column({ nullable: true })
	replies: string;

	@Column({ nullable: true })
	reactions: string;

	@Column({ nullable: true })
	original_note: string;
}
