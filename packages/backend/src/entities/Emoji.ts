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

	@Column({ unique: true })
	apId: string;

	@Column({ nullable: true })
	category: string;

	@Column()
	shortcode: string;

	@Column({ nullable: true })
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

	@Column({ nullable: true })
	updatedAt: string;
}
