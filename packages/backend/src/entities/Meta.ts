import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Meta {
	@PrimaryColumn()
	name: string;

	@Column()
	created_at: string;

	@Column('text', { array: true, nullable: true })
	rules: string[];

	@Column()
	description: string;

	@Column()
	description_long: string;
}
