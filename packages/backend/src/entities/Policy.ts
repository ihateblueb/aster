import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Policy {
	@PrimaryColumn({ unique: true })
	id: string;

	@Column()
	type: string;

	@Column({ nullable: true })
	host: string;

	@Column({ nullable: true })
	regex: string;

	@Column({ nullable: true })
	cw: string;
}
