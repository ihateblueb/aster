import { User } from './User.js';
import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class UserNotification {
	@PrimaryColumn()
	id: string;

	@OneToOne(() => User, (user) => user)
	to: User | null;

	@OneToOne(() => User, (user) => user)
	from: User | null;

	@Column({ nullable: true })
	type: string;

	@Column({ nullable: true })
	time: string;

	@Column({ nullable: true })
	object: string;

	@Column({ nullable: true })
	reaction: string;
}
