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
export class Bookmark {
	@PrimaryColumn({ unique: true })
	id: string;

	@Column({ select: false })
	creatorId: string;

	@ManyToOne(() => User, (user) => user, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'creatorId' })
	creator: typeorm.Relation<User>;

	// bookmark a user, or a note

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

	@Column()
	createdAt: string;
}
