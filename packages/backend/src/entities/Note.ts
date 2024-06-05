import { Entity, Column, PrimaryColumn } from 'typeorm';

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

	@Column('text', { array: true, nullable: true })
	replies: string[];

	@Column('text', { array: true, nullable: true })
	repeats: string[];

	@Column('text', { array: true, nullable: true })
	quotes: string[];

	@Column('text', { array: true, nullable: true })
	likes: string[];

	@Column('text', { array: true, nullable: true })
	reactions: string[];
}
