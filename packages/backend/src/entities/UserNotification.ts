import { Users } from './User.js';
import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';


@Entity()
export class UsersNotification {
	@PrimaryColumn()
	id: string;

	@OneToOne(() => Users, (user) => user)
	to: Users | null;

	@OneToOne(() => Users, (user) => user)
	from: Users | null;

	@Column({ nullable: true })
	type: string;

	@Column({ nullable: true })
	time: string;

	@Column({ nullable: true })
	object: string;

	@Column({ nullable: true })
	reaction: string;
}
