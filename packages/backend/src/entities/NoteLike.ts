import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class NotesLike {
	@PrimaryColumn()
	id: string;

	@Column()
	ap_id: string;

	@Column({ nullable: true })
	note: string;

	@Column({ nullable: true })
	created_at: string;

	@Column({ nullable: true })
	user: string;
}
