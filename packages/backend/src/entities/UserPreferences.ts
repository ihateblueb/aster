import typeorm, {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryColumn
} from 'typeorm';

import { User } from './User.js';

@Entity()
export class UserPreferences {
	@PrimaryColumn({ unique: true })
	id: string;

	@Column({ select: false })
	userId: string;

	@ManyToOne(() => User, (user) => user, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'userId' })
	user: typeorm.Relation<User>;

	// todo: if false, only deliver to note author
	@Column({ default: true })
	makeLikesPublic: boolean;
}
