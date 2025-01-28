import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1738040528210 implements MigrationInterface {
	name = 'Migration1738040528210';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note_react" DROP COLUMN "emojiId"`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note_react" ADD "emojiId" character varying NOT NULL`
		);
	}
}
