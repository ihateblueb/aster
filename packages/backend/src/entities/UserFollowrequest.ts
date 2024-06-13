import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class UsersFollowrequest {
	@PrimaryColumn()
	id: string;

	@Column({ nullable: true })
	to: string;

	@Column({ nullable: true })
	from: string;

	@Column({ nullable: true })
	time: string;
}
