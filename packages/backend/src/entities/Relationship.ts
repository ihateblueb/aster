import typeorm, {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryColumn
} from 'typeorm';

import { Activity } from './Activity.js';
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

	/* the id of the Activity that was sent
	 * only saved if neccesary
	 */
	@Column({ select: false, nullable: true })
	activityForResponseId: string | null;

	@OneToOne(() => Activity, (activity) => activity, {
		onDelete: 'CASCADE',
		nullable: true
	})
	@JoinColumn({ name: 'activityForResponseId' })
	activityForResponse: typeorm.Relation<Activity> | null;

	@Column()
	createdAt: string;

	@Column({ nullable: true })
	updatedAt: string;
}
