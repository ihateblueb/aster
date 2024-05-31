import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class UsersAuth {
	@PrimaryColumn()
	id: string;

	@Column({ nullable: true })
	user: string;

	@Column({ nullable: true })
	created_at: string;

	@Column({ nullable: true })
	token: string;

	@Column('text', { array: true, nullable: true })
	permissions: string[];
}
