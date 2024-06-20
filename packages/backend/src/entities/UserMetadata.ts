import { User } from './User.js';
import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class UserMetadata {
	@PrimaryColumn()
	id: string;

	@OneToOne(() => User, (user) => user)
	user: User | null;

	@Column({ nullable: false, default: 0 })
	order: number;

	@Column()
	key: string;

	@Column()
	value: string;
}
