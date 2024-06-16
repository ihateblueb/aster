import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Meta {
	@PrimaryColumn()
	name: string;

	@Column()
	created_at: string;

	@Column({ nullable: true })
	color: string;

	@Column({ nullable: true })
	maintainer: string;

	@Column({ nullable: true })
	maintainer_email: string;

	@Column({ default: 'closed' })
	registration: string;

	@Column('text', { array: true, nullable: true })
	rules: string[];

	@Column({ nullable: true })
	description: string;

	@Column({ nullable: true })
	description_long: string;

	@Column({ default: false })
	init: boolean;

	// statistics

	@Column({ nullable: true })
	local_user_count: number;

	@Column({ nullable: true })
	total_user_count: number;

	@Column({ nullable: true })
	local_note_count: number;

	@Column({ nullable: true })
	total__count: number;

	@Column({ nullable: true })
	instance_count: number;
}
