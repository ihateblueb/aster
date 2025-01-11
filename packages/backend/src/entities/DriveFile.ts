import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class DriveFile {
	@PrimaryColumn({ unique: true })
	id: string;

	// nullable because i dont want to assign remote media not posted by users to users (e.g. emoji)

	@Column({ default: false })
	sensitive: boolean;

	@Column({ nullable: true })
	alt: string;

	@Column()
	src: string;

	@Column()
	createdAt: string;

	@Column({ nullable: true })
	updatedAt: string;
}
