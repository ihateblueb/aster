import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class UserModeration {
	@PrimaryColumn({ unique: true })
	id: string;

	@Column({ nullable: true })
	note: string;

	@Column({ nullable: true })
	forcedCw: string;
}
