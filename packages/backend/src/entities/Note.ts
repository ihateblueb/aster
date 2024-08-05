import { User } from './User.js';
import {
	Column,
	Entity,
	PrimaryColumn,
	OneToOne,
	JoinColumn,
	Relation
} from 'typeorm';

@Entity()
export class Note {
	@PrimaryColumn()
	id: string;

	@Column({ unique: true })
	ap_id: string;

	@Column()
	created_at: string;

	@Column({ default: 'public' })
	visibility: string;

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

	@Column('jsonb', { nullable: true })
	emojis: string;

	@Column('jsonb', { nullable: true })
	tags: string;

	@Column({ nullable: true })
	quoted: string;
}
