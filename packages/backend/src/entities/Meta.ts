import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Instances {
	@PrimaryColumn()
	created_at: string;

	@Column('text', { array: true, nullable: true })
	rules: string[];

	@Column()
	description: string;

	@Column()
	description_long: string;
}
