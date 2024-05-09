import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Instance {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	created_at: string;

	@Column()
	updated_at: string;

	@Column()
	last_communicated: string;

	@Column({ default: true })
	responding: boolean;

	@Column()
	user_count: number;

	@Column()
	note_count: number;

	@Column({ default: false })
	suspended: boolean;

	@Column({ default: false })
	silenced: boolean;

	@Column()
	mod_note: string;

	@Column()
	host: string;

	@Column()
	name: string;

	@Column()
	description: string;

	@Column()
	color: string;

	@Column()
	maintainer: string;

	@Column()
	maintainer_email: string;

	@Column()
	software: string;

	@Column()
	version: string;

	@Column()
	icon: string;
}
