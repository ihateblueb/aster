import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Auth {
	@PrimaryColumn({ unique: true })
	id: string;

	@Column()
	user: string;

	@Column()
	createdAt: string;

	@Column({ unique: true })
	token: string;
}
