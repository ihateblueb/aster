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

	// statistics

	@Column({ default: 0 })
	local_user_count: number;

	@Column({ default: 0 })
	total_user_count: number;

	@Column({ default: 0 })
	local_note_count: number;

	@Column({ default: 0 })
	total_note_count: number;

	@Column({ default: 0 })
	instance_count: number;
}
