import { Entity, Column } from 'typeorm';

@Entity()
export class Instances {
	@Column()
	created_at: string;

	@Column('text', { array: true, nullable: true })
	rules: string[];

	@Column()
	description: string;

	@Column()
	description_long: string;
}
