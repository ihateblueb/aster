import { User } from './User.js';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

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

	@ManyToOne(() => User, (user) => user)
	users: User[];

	@Column('text', { array: true, nullable: true })
	permissions: string[];
}
