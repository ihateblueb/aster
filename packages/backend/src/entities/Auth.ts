import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Auth {
	@PrimaryColumn({ unique: true })
	id: string;

	@Column()
	user: string;

	@Column()
	created_at: string;

	@Column({ unique: true })
	token: string;
}
