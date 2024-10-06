import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
	@PrimaryColumn({ unique: true })
	id: string;

	@Column({ unique: true })
	apId: string;

	@Column({ nullable: true })
	inbox: string;

	@Column({ nullable: true })
	outbox: string;

	@Column()
	username: string;

	@Column({ nullable: true })
	displayName: string;

	@Column({ nullable: true })
	host: string;

	@Column({ default: false })
	local: boolean;

	@Column({ default: false })
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
	bio: boolean;

	@Column({ nullable: true })
	location: string;

	@Column({ nullable: true })
	birthday: string;

	@Column({ type: 'jsonb', nullable: true })
	metadata: string;

	@Column({ default: false })
	isCat: boolean;

	@Column({ default: false })
	speakAsCat: boolean;

	@Column({ nullable: true })
	avatar: string;

	@Column({ nullable: true })
	banner: string;

	@Column({ nullable: true })
	background: string;

	@Column()
	createdAt: string;

	@Column()
	updatedAt: string;

	@Column()
	followingUrl: string;

	@Column()
	followersUrl: string;

	@Column({ default: false })
	admin: boolean;

	@Column()
	publicKey: string;
}
