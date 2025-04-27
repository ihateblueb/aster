import typeorm, {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryColumn
} from 'typeorm';

import { User } from './User.js';

@Entity()
export class Relationship {
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

	// mute, block, follow
	@Column()
	type: string;

	// only for when 'to' has locked account
	@Column({ default: false })
	pending: boolean;

	@Column({ nullable: true })
	activityForResponseId: string;

	@Column()
	createdAt: string;

	@Column({ nullable: true })
	updatedAt: string;
}
