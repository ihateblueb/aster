import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1738040509673 implements MigrationInterface {
	name = 'Migration1738040509673';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note_react" DROP COLUMN "content"`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note_react" ADD "content" character varying`
		);
	}
}
