import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Instances {
	@PrimaryColumn()
	id: string;

	@Column()
	created_at: string;

	@Column({ nullable: true })
	updated_at: string;

	@Column()
	last_communicated: string;

	@Column({ default: true })
	responding: boolean;

	@Column({ nullable: true })
	user_count: number;

	@Column({ nullable: true })
	note_count: number;

	@Column({ default: false })
	suspended: boolean;

	@Column({ default: false })
	silenced: boolean;

	@Column({ nullable: true })
	mod_note: string;

	@Column()
	host: string;

	@Column({ nullable: true })
	name: string;

	@Column({ nullable: true })
	description: string;

	@Column({ nullable: true })
	color: string;

	@Column({ nullable: true })
	maintainer: string;

	@Column({ nullable: true })
	maintainer_email: string;

	@Column({ nullable: true })
	software: string;

	@Column({ nullable: true })
	version: string;

	@Column({ nullable: true })
	icon: string;
}
