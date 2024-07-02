import { User } from './User.js';
import { Column, Entity, OneToOne, PrimaryColumn, Relation } from 'typeorm';

@Entity()
export class UserNotification {
	@PrimaryColumn()
	id: string;

	@Column()
	to: string;

	@Column()
	from: string;

	@Column()
	type: string;

	@Column({ nullable: true })
	time: string;

	@Column({ nullable: true })
	object: string;

	@Column({ nullable: true })
	reaction: string;
}
