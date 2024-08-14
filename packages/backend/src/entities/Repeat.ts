import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Repeat {
	@PrimaryColumn()
	id: string;

	@Column({ unique: true })
	ap_id: string;

	@Column()
	created_at: string;

	@Column({ default: 'public' })
	visibility: string;

	@Column()
	author: string;

	@Column({ default: false })
	local: boolean;

	@Column()
	note: string;
}
