import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Relationship {
	@PrimaryColumn()
	id: string;

	@Column()
	created_at: string;

	@Column()
	to: string;

	@Column()
	from: string;

	@Column({ default: false })
	pending: string;

	@Column('jsonb', { nullable: true })
	object: string;

	@Column({ default: false })
	severed: boolean;
}
