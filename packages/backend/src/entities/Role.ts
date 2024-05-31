import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Roles {
	@PrimaryColumn()
	id: string;

	@Column()
	name: string;

	@Column({ nullable: true })
	color: string;

	@Column({ nullable: true })
	icon: string;

	@Column({ default: true })
	hidden: boolean;

	@Column('text', { array: true, nullable: true })
	users: string[];

	@Column('text', { array: true, nullable: true })
	permissions: string[];
}
