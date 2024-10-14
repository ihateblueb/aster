import typeorm, {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryColumn
} from 'typeorm';

import { User } from './User.js';

@Entity()
export class Note {
	@PrimaryColumn({ unique: true })
	id: string;

	@Column({ unique: true })
	apId: string;

	@Column({ select: false })
	userId: string;

	@ManyToOne(() => User, (user) => user)
	@JoinColumn({ name: 'userId' })
	/* see https://github.com/typeorm/typeorm/issues/9894
	 * importing Relation directly does not work!
	 * */
	user: typeorm.Relation<User>;

	@Column({ default: false })
	local: boolean;

	@Column({ nullable: true })
	cw: string;

	@Column()
	content: string;

	@Column({ default: 'public' })
	visibility: string;

	@Column()
	createdAt: string;
}
