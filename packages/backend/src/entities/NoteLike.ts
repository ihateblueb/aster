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
export class NoteLike {
	@PrimaryColumn({ unique: true })
	id: string;

	@Column({ select: false })
	userId: string;

	@ManyToOne(() => User, (user) => user, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'userId' })
	user: typeorm.Relation<User>;

	@Column({ select: false })
	noteId: string;

	@ManyToOne(() => Note, (note) => note.likes, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'noteId' })
	note: typeorm.Relation<Note>;

	@Column()
	createdAt: string;
}
