import { User } from './User.js';
import { Column, Entity, OneToOne, PrimaryColumn, Relation } from 'typeorm';

@Entity()
export class UserAuth {
	@PrimaryColumn()
	id: string;

	@Column()
	user: string;

	@Column()
	created_at: string;

	@Column('text', { array: true, nullable: true })
	used_at: string[];

	@Column()
	token: string;

	@Column('text', { array: true, nullable: true })
	permissions: string[];
}
