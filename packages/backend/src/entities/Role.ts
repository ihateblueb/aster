import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Roles {
	@PrimaryColumn()
	id: string;

	@Column()
	name: string;

	@Column({ nullable: true })
	color: string;

	@Column('text', { array: true, nullable: true })
	users: string[];

	@Column('text', { array: true, nullable: true })
	permissions: string[];
}
