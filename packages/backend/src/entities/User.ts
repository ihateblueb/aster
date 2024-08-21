import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
	@PrimaryColumn()
	id: string;

	@Column({ unique: true })
	ap_id: string;

	@Column()
	inbox: string;

	@Column()
	outbox: string;

	@Column()
	username: string;

	@Column()
	host: string;

	@Column({ nullable: true })
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
	indexable: boolean;

	@Column({ default: false })
	automated: boolean;

	@Column({ nullable: true })
	avatar: string;

	@Column({ nullable: true })
	avatar_alt: string;

	@Column({ nullable: true })
	banner: string;

	@Column({ nullable: true })
	banner_alt: string;

	@Column({ nullable: true })
	background: string;

	@Column({ nullable: true })
	background_alt: string;

	@Column({ nullable: true })
	bio: string;

	@Column({ nullable: true })
	location: string;

	@Column({ nullable: true })
	birthday: string;

	@Column({ default: false })
	is_cat: boolean;

	@Column({ default: false })
	speak_as_cat: boolean;

	@Column()
	created_at: string;

	@Column({ nullable: true })
	updated_at: string;

	@Column()
	following_url: string;

	@Column()
	followers_url: string;

	@Column('text', { array: true, nullable: true })
	pinned_notes: string[];

	@Column({ default: false })
	admin: boolean;

	@Column({ default: false })
	mod: boolean;

	@Column('jsonb', { nullable: true })
	roles: string;

	@Column('jsonb', { nullable: true })
	metadata: string;

	// counts

	@Column({ nullable: true, default: 0 })
	total_notes: number;

	@Column({ nullable: true, default: 0 })
	total_followers: number;

	@Column({ nullable: true, default: 0 })
	total_following: number;

	@Column()
	public_key: string;
}
