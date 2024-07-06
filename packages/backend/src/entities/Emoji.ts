import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Emoji {
	@PrimaryColumn()
	id: string;

	@Column({ unique: true })
	ap_id: string;

	@Column()
	created_at: string;

	@Column()
	updated_at: string;

	@Column()
	local: string;

	@Column()
	host: string;

	@Column()
	name: string;

	@Column()
	url: string;

	@Column()
	type: string;
}
