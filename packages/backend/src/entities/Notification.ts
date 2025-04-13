import typeorm, {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryColumn
} from 'typeorm';

import { Note } from './Note.js';
import { Relationship } from './Relationship.js';
import { User } from './User.js';

@Entity()
export class Notification {
	@PrimaryColumn({ unique: true })
	id: string;

	@Column({ select: false })
	toId: string;

	@ManyToOne(() => User, (user) => user, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'toId' })
	to: typeorm.Relation<User>;

	@Column({ select: false })
	fromId: string;

	@ManyToOne(() => User, (user) => user, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'fromId' })
	from: typeorm.Relation<User>;

	@Column()
	type: string;

	@Column({ default: false })
	read: boolean;

	@Column()
	createdAt: string;

	@Column({ select: false, nullable: true })
	noteId: string;

	@ManyToOne(() => Note, (note) => note, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'noteId' })
	note: typeorm.Relation<Note>;

	@Column({ select: false, nullable: true })
	userId: string;

	@ManyToOne(() => User, (user) => user, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'userId' })
	user: typeorm.Relation<User>;

	@Column({ select: false, nullable: true })
	relationshipId: string;

	@ManyToOne(() => Relationship, (relationship) => relationship, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'relationshipId' })
	relationship: typeorm.Relation<Relationship>;
}
