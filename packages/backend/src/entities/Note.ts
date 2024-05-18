import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Notes {
	@PrimaryColumn()
	id: string;

	@Column()
	created_at: string;

	@Column({ nullable: true })
	replying_to: string;

	@Column()
	author: string;

	@Column({ default: false })
	local: boolean;

	@Column({ nullable: true })
	cw: string;

	@Column()
	content: string;
}
