import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class NotesRepeat {
	@PrimaryColumn()
	id: string;

	@Column({ nullable: true })
	ap_id: string;

	@Column({ nullable: true })
	original_note: string;

	@Column({ nullable: true })
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

	@Column('text', { array: true, nullable: true })
	edits: string[];
}
