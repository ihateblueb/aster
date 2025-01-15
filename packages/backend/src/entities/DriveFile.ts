import typeorm, {
	Column,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	PrimaryColumn
} from 'typeorm';

import { Note } from './Note.js';

@Entity()
export class DriveFile {
	@PrimaryColumn({ unique: true })
	id: string;

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
