import typeorm, { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Note } from './Note.js';
import { User } from './User.js';
import { Relationship } from './Relationship.js';

@Entity()
export class Notification {
	@PrimaryColumn({ unique: true })
	id: string;

	@Column()
	to: string;

	@Column()
	from: string;

	@Column()
	type: string;

	@Column({ default: false })
	read: boolean;

	@Column()
	createdAt: string;

	@Column({ select: false, nullable: true })
	noteId: string | null;

	@ManyToOne(() => Note, (note) => note, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'noteId' })
	note: typeorm.Relation<Note> | null;

	@Column({ select: false, nullable: true })
	userId: string | null;

	@ManyToOne(() => User, (user) => user, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'userId' })
	user: typeorm.Relation<User> | null;

	@Column({ select: false, nullable: true })
	relationshipId: string | null;

	@ManyToOne(() => Relationship, (relationship) => relationship, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'relationshipId' })
	relationship: typeorm.Relation<Relationship> | null;
}
