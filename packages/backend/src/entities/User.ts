import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	ap_id: string;

	@Column()
	username: string;

	@Column()
	displayname: string;

	@Column({ default: false })
	local: boolean;

	@Column()
	url: string;

	@Column({ default: true })
	locked: boolean;

	@Column({ default: false })
	suspended: boolean;

	@Column({ default: false })
	deactivated: boolean;

	@Column({ default: false })
	discoverable: boolean;

	@Column({ default: false })
	automated: boolean;

	@Column()
	avatar: string;

	@Column()
	banner: string;

	@Column()
	background: string;

	@Column()
	bio: string;

	@Column({ default: false })
	is_cat: boolean;

	@Column({ default: false })
	speak_as_cat: boolean;

	@Column()
	created_at: string;

	@Column()
	updated_at: string;

	@Column('string', { array: true })
	following: string[];

	@Column('string', { array: true })
	followers: string[];

	@Column('string', { array: true })
	pending_followers: string[];

	@Column()
	public_key: string;

	@Column({ select: false })
	private_key: string;

	@Column({ select: false })
	password: string;
}
