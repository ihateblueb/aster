import typeorm, {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryColumn
} from 'typeorm';

import { User } from './User.js';

@Entity()
export class DriveFile {
	@PrimaryColumn({ unique: true })
	id: string;

	@Column()
	src: string;

	@Column({ nullable: true })
	alt: string;

	@Column({ nullable: true })
	type: string;

	@Column({ default: false })
	sensitive: boolean;

	@Column({ select: false, nullable: true })
	userId: string;

	@ManyToOne(() => User, (user) => user, {
		onDelete: 'CASCADE',
		nullable: true
	})
	@JoinColumn({ name: 'userId' })
	user: typeorm.Relation<User>;

	@Column()
	createdAt: string;

	@Column({ nullable: true })
	updatedAt: string;
}
