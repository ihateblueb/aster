import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1738039491382 implements MigrationInterface {
	name = 'Migration1738039491382';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note_react" ADD "content" character varying NOT NULL`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note_react" DROP COLUMN "content"`
		);
	}
}
