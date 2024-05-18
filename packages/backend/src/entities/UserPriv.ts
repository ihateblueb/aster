import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class UsersPriv {
	@PrimaryColumn()
	id: string;

	@Column({ nullable: true })
	private_key: string;

	@Column({ nullable: true })
	password: string;
}
