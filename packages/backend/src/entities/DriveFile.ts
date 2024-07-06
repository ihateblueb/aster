import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class DriveFile {
	@PrimaryColumn()
	id: string;

	@Column({ unique: true })
	ap_id: string;

	@Column({ nullable: true })
	note: string;

	@Column()
	user: string;

	@Column()
	created_at: string;

	@Column()
	updated_at: string;

	@Column()
	type: string;

	@Column()
	src: string;

	@Column({ nullable: true })
	alt: string;
}
