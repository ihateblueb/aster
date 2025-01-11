import typeorm, {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryColumn
} from 'typeorm';

import { Note } from './Note.js';
import { User } from './User.js';

@Entity()
export class Report {
	@PrimaryColumn({ unique: true })
	id: string;

	@Column({ unique: true })
	apId: string;

	@Column({ select: false })
	fromId: string;

	@ManyToOne(() => User, (user) => user, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'fromId' })
	from: typeorm.Relation<User>;

	@Column({ select: false, nullable: true })
	userId: string;

	@ManyToOne(() => User, (user) => user, {
		onDelete: 'CASCADE',
		nullable: true
	})
	@JoinColumn({ name: 'userId' })
	user: typeorm.Relation<User>;

	@Column({ select: false, nullable: true })
	noteId: string;

	@ManyToOne(() => Note, (note) => note, {
		onDelete: 'CASCADE',
		nullable: true
	})
	@JoinColumn({ name: 'noteId' })
	note: typeorm.Relation<Note>;

	@Column({ nullable: true })
	content: string;

	@Column({ default: false })
	resolved: boolean;

	@Column()
	createdAt: string;
}
