import typeorm, {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryColumn
} from 'typeorm';

import { DriveFile } from './DriveFile.js';

@Entity()
export class Emoji {
	@PrimaryColumn({ unique: true })
	id: string;

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
