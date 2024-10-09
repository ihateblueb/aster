import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Relationship {
	@PrimaryColumn({ unique: true })
	id: string;

	@Column()
	to: string;

	@Column()
	from: string;

	// mute, block, follow
	@Column()
	type: string;

	// only for when to has locked account
	@Column({ default: false })
	pending: boolean;

	@Column()
	createdAt: string;
}
