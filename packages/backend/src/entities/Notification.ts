import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Notification {
	@PrimaryColumn({ unique: true })
	id: string;

	@Column()
	to: string;

	@Column()
	from: string;

	@Column()
	type: string;

	@Column({ default: false })
	read: boolean;

	@Column()
	createdAt: string;

	// todo: seperate object type entities? or just one object?
	@Column({ nullable: true })
	object: string;
}
