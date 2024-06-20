import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Ad {
	@PrimaryColumn()
	id: string;

	@Column({ nullable: true })
	created_at: string;

	// when null, it never expires

	@Column({ nullable: true })
	expire_at: string;

	@Column({ nullable: true })
	url: string;

	@Column({ nullable: true })
	alt: string;

	@Column({ nullable: true })
	link: string;

	@Column({ nullable: true })
	comment: string;
}
