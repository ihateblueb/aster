import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class DriveFile {
	@PrimaryColumn()
	id: string;

	@Column({ unique: true })
	ap_id: string;

	@Column()
	local: boolean;

	@Column({ nullable: true })
	name: string;

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

	@Column()
	width: string;

	@Column()
	height: string;

	@Column()
	thumbnail: string;

	@Column()
	thumbnail_width: string;

	@Column()
	thumbnail_height: string;

	@Column()
	blurhash: string;

	@Column({ nullable: true })
	alt: string;
}
