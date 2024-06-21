import { User } from './User.js';
import { Column, Entity, OneToOne, PrimaryColumn, Relation } from 'typeorm';

@Entity()
export class UserNotification {
	@PrimaryColumn()
	id: string;

	@OneToOne(() => User, (user) => user)
	to: Relation<User> | null;

	@OneToOne(() => User, (user) => user)
	from: Relation<User> | null;

	@Column({ nullable: true })
	type: string;

	@Column({ nullable: true })
	time: string;

	@Column({ nullable: true })
	object: string;

	@Column({ nullable: true })
	reaction: string;
}
