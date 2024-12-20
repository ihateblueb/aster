import {
	Column,
	Entity,
	PrimaryColumn
} from 'typeorm';

@Entity()
export class Poll {
	@PrimaryColumn({ unique: true })
	id: string;

	@Column({ array: true })
	key: string;

	@Column({ array: true })
	value: string;

	@Column({ default: false })
	hasCorrectAnswer: boolean;

	@Column({ array: true, nullable: true })
	correctness: string;
}
