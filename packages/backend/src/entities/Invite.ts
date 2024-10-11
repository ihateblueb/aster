import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Invite {
	@PrimaryColumn({ unique: true })
	id: string;

	@Column()
	creator: string;

	@Column()
	createdAt: string;

	@Column({ nullable: true })
	usedBy: string;

	@Column()
	invite: string;
}
