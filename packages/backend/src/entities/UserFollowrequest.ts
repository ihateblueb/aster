import { User } from './User.js';
import { Column, Entity, OneToOne, PrimaryColumn, Relation } from 'typeorm';

@Entity()
export class UserFollowrequest {
	@PrimaryColumn()
	id: string;

	@Column()
	to: string;

	@Column()
	from: string;

	@Column()
	time: string;

	@Column({ nullable: true })
	object: string;
}
