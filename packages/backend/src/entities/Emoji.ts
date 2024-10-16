import typeorm, { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';

import { DriveFile } from './DriveFile.js';

@Entity()
export class Emoji {
	@PrimaryColumn({ unique: true })
	id: string;

	@Column({ select: false })
	driveFileId: string 

	@OneToOne(() => DriveFile, (driveFile) => driveFile, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'driveFileId' })
	driveFile: typeorm.Relation<DriveFile>;

	@Column()
	createdAt: string;
}
