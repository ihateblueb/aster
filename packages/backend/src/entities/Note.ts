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

	@ManyToOne(() => User, (user) => user.notes)
	@JoinColumn({
		name: 'user'
	})
	/* see https://github.com/typeorm/typeorm/issues/9894
	 * importing Relation directly does not work
	 * */
	public user: typeorm.Relation<User>;

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
