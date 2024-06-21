import { User } from './User.js';
import { Column, Entity, OneToOne, PrimaryColumn, Relation } from 'typeorm';

@Entity()
export class UserAuth {
	@PrimaryColumn()
	id: string;

	@OneToOne(() => User, (user) => user)
	user: Relation<User> | null;

	@Column({ nullable: true })
	created_at: string;

	@Column('text', { array: true, nullable: true })
	used_at: string[];

	@Column({ nullable: true })
	token: string;

	@Column('text', { array: true, nullable: true })
	permissions: string[];
}
