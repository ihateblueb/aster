import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { User } from './User.js';

@Entity()
export class Note {
	@PrimaryColumn({ unique: true })
	id: string;

	@Column({ unique: true })
	apId: string;

	@OneToOne(() => User)
	@JoinColumn()
	user: User;

	@Column({ default: false })
	local: boolean;

	@Column({ default: 'public' })
	visibility: string;

	@Column()
	content: string;

	@Column()
	createdAt: string;
}
