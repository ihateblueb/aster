import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Note {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	created_at: string;

	@Column()
	replying_to: string;

	@Column()
	author: string;

	@Column({ default: false })
	local: boolean;

	@Column()
	cw: string;

	@Column()
	content: string;
}
