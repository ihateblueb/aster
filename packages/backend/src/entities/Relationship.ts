import typeorm, {
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryColumn
} from 'typeorm';

import { Activity } from './Activity.js';

@Entity()
export class Relationship {
	@PrimaryColumn({ unique: true })
	id: string;

	@Column()
	to: string;

	@Column()
	from: string;

	// mute, block, follow
	@Column()
	type: string;

	// only for when 'to' has locked account
	@Column({ default: false })
	pending: boolean;

	/* the id of the Activity that was sent
	 * only saved if neccesary
	 */
	@Column({ select: false })
	responseActivityId: string | null;

	@OneToOne(() => Activity, (activity) => activity, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'responseActivityId' })
	responseActivity: typeorm.Relation<Activity> | null;

	@Column()
	createdAt: string;
}
