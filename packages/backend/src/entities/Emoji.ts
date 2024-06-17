import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Emojis {
	@PrimaryColumn()
	id: string;

	@Column({ nullable: true })
	ap_id: string;

	@Column({ nullable: true })
	created_at: string;

	@Column({ nullable: true })
	updated_at: string;

	@Column({ nullable: true })
	local: string;

	@Column({ nullable: true })
	host: string;

	@Column({ nullable: true })
	name: string;

	@Column({ nullable: true })
	url: string;
}
