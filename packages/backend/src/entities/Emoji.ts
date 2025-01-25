import typeorm, {
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryColumn
} from 'typeorm';

import { DriveFile } from './DriveFile.js';

@Entity()
export class Emoji {
	@PrimaryColumn({ unique: true })
	id: string;

	@PrimaryColumn({ unique: true })
	apId: string;

	@PrimaryColumn()
	shortcode: string;

	@PrimaryColumn()
	host: string;

	@Column({ select: false })
	fileId: string;

	@OneToOne(() => DriveFile, (driveFile) => driveFile, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'fileId' })
	file: typeorm.Relation<DriveFile>;

	@Column()
	createdAt: string;
}
