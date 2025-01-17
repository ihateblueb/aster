import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1736959075964 implements MigrationInterface {
	name = 'Migration1736959075964';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note" ADD "attachmentIds" character varying array`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note" DROP COLUMN "attachmentIds"`
		);
	}
}
