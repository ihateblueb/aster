import { Column, Entity, PrimaryColumn } from 'typeorm';

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
