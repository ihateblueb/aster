import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class NoteLike {
	@PrimaryColumn()
	id: string;

	@Column({ unique: true })
	ap_id: string;

	@Column()
	note: string;

	@Column()
	created_at: string;

	@Column()
	user: string;
}
