import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class UsersNotification {
	@PrimaryColumn()
	id: string;

	@Column({ nullable: true })
	to: string;

	@Column({ nullable: true })
	from: string;

	@Column({ nullable: true })
	type: string;

	@Column({ nullable: true })
	time: string;

	@Column({ nullable: true })
	object: string;

	// this gets its own column because the object would already hold the note id

	@Column({ nullable: true })
	reaction: string;
}
