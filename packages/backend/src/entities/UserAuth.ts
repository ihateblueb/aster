import { Users } from './User.js';
import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';


@Entity()
export class UsersAuth {
	@PrimaryColumn()
	id: string;

	@OneToOne(() => Users, (user) => user)
	user: Users | null;

	@Column({ nullable: true })
	created_at: string;

	@Column('text', { array: true, nullable: true })
	used_at: string[];

	@Column({ nullable: true })
	token: string;

	@Column('text', { array: true, nullable: true })
	permissions: string[];
}
