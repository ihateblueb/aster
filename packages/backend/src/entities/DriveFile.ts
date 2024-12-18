import typeorm, {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryColumn
} from 'typeorm';

import { User } from './User.js';

@Entity()
export class DriveFile {
	@PrimaryColumn({ unique: true })
	id: string;

	// nullable because i dont want to assign remote media not posted by users to users (e.g. emoji)

	@Column({ select: false, nullable: true })
	userId: string;

	@ManyToOne(() => User, (user) => user, {
		onDelete: 'CASCADE',
		nullable: true
	})
	@JoinColumn({ name: 'userId' })
	user: typeorm.Relation<User>;

	@Column({ default: false })
	sensitive: boolean;

	@Column({ nullable: true })
	alt: string;

	@Column()
	src: string;

	@Column()
	createdAt: string;

	@Column({ nullable: true })
	updatedAt: string;
}
