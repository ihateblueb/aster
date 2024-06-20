import { Users } from './User.js';
import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';


@Entity()
export class UsersFollowrequest {
	@PrimaryColumn()
	id: string;

	@OneToOne(() => Users, (user) => user)
	to: Users | null;

	@OneToOne(() => Users, (user) => user)
	from: Users | null;

	@Column({ nullable: true })
	time: string;

	@Column({ nullable: true })
	object: string;
}
