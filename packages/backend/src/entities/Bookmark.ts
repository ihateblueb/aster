import typeorm, { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './User.js';
import { Note } from './Note.js';

@Entity()
export class Activity {
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

	@Column({ select: false })
	userId: string | null;

	@ManyToOne(() => User, (user) => user, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'userId' })
	user: typeorm.Relation<User> | null;

	@Column({ select: false })
	noteId: string | null;

	@ManyToOne(() => Note, (note) => note, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'noteId' })
	note: typeorm.Relation<Note> | null;

	@Column()
	createdAt: string;
}
