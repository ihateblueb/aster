import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
	@PrimaryColumn({ unique: true })
	id: string;

	@Column({ unique: true })
	user: string;

	@Column()
	password: string;

	@Column()
	privateKey: string;
}
