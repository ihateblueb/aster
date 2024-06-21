import { User } from './User.js';
import { Column, Entity, OneToOne, PrimaryColumn, Relation } from 'typeorm';

@Entity()
export class UserMetadata {
	@PrimaryColumn()
	id: string;

	@OneToOne(() => User, (user) => user)
	user: Relation<User> | null;

	@Column({ nullable: false, default: 0 })
	order: number;

	@Column()
	key: string;

	@Column()
	value: string;
}
