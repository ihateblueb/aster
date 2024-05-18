import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Users {
	@PrimaryColumn()
	id: string;

	@Column({ nullable: true })
	ap_id: string;

	@Column()
	username: string;

	@Column({ nullable: true })
	displayname: string;

	@Column({ default: false })
	local: boolean;

	@Column({ nullable: true })
	url!: string;

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

	@Column({ nullable: true })
	avatar: string;

	@Column({ nullable: true })
	banner: string;

	@Column({ nullable: true })
	background!: string;

	@Column({ nullable: true })
	bio: string;

	@Column({ default: false })
	is_cat: boolean;

	@Column({ default: false })
	speak_as_cat: boolean;

	@Column()
	created_at: string;

	@Column({ nullable: true })
	updated_at: string;

	@Column('text', { array: true, nullable: true })
	following: string[];

	@Column('text', { array: true, nullable: true })
	followers: string[];

	@Column('text', { array: true, nullable: true })
	pending_followers: string[];

	@Column()
	public_key: string;

	@Column({ select: false, nullable: true })
	private_key: string;

	@Column({ select: false, nullable: true })
	password: string;
}
