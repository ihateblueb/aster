import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Role {
	@PrimaryColumn()
	id: string;

	@Column()
	name: string;

	@Column({ nullable: true })
	color: string;

	@Column({ nullable: true })
	icon: string;

	@Column()
	hidden: boolean;

	@Column('text', { array: true, nullable: true })
	users: string[];

	@Column('text', { array: true, nullable: true })
	permissions: string[];
}
