import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Poll {
	@PrimaryColumn({ unique: true })
	id: string;

	// eg. {one,two,there}
	@Column({ array: true })
	keys: string;

	// eg. {id,id,id} ig
	@Column({ array: true })
	values: string;

	@Column({ default: false })
	hasCorrectAnswer: boolean;

	// eg. {false,false,true}
	@Column({ array: true, nullable: true })
	correctness: string;
}
