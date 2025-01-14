import typeorm, {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryColumn
} from 'typeorm';

import { User } from './User.js';

@Entity()
export class Mood {
	@PrimaryColumn({ unique: true })
	id: string;

	@Column()
	apId: string;

	@Column({ select: false })
	userId: string;

	@ManyToOne(() => User, (user) => user, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'userId' })
	user: typeorm.Relation<User>;

	@Column()
	content: string;

	@Column()
	visibility: string;

	@Column()
	createdAt: string;

	@Column()
	expiresAt: string;
}
