import { Notes } from './Note.js';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';


@Entity()
export class Users {
	@PrimaryColumn()
	id: string;

	@Column({ nullable: true })
	ap_id: string;

	@Column({ nullable: true })
	inbox: string;

	@Column()
	username: string;

	@Column({ nullable: true })
	host: string;

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

	@Column()
	following_url: string;

	@Column('text', { array: true, nullable: true })
	following: string[];

	@Column()
	followers_url: string;

	@Column('text', { array: true, nullable: true })
	followers: string[];

	@Column('text', { array: true, nullable: true })
	roles: string[];

	@ManyToOne(() => Notes, (note) => note)
	pinned_notes: Notes[] | null;

	// counts

	@Column({ nullable: true })
	total_notes: number;

	@Column({ nullable: true })
	total_followers: number;

	@Column({ nullable: true })
	total_following: number;

	// stored like
	// { {"key":"val"} }

	@Column('text', { array: true, nullable: true })
	metadata: string[];

	@Column()
	public_key: string;
}
