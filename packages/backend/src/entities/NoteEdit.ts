import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class NoteEdit {
	@PrimaryColumn()
	id: string;

	@Column()
	note: string;

	@Column()
	created_at: string;

	@Column({ nullable: true })
	cw: string;

	@Column()
	content: string;
}
