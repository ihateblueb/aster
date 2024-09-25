import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Notification {
	@PrimaryColumn()
	id: string;

	@Column()
	to: string;

	@Column()
	from: string;

	@Column()
	type: string;

	@Column({ nullable: true })
	created_at: string;

	@Column({ nullable: true })
	object: string;

	@Column({ nullable: true })
	reaction: string;
}
