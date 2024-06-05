import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class NotesEdit {
	@PrimaryColumn()
	id: string;

	@Column({ nullable: true })
	note: string;

	@Column({ nullable: true })
	created_at: string;

	@Column('text', { array: true, nullable: true })
	cw: string[];

	@Column({ nullable: true })
	content: string;

	@Column('text', { array: true, nullable: true })
	permissions: string[];
}
