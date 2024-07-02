import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class UserPriv {
	@PrimaryColumn()
	id: string;

	@Column()
	private_key: string;

	@Column({ nullable: true })
	password: string;
}
