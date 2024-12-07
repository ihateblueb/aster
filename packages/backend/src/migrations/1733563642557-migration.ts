import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1733563642557 implements MigrationInterface {
	name = 'Migration1733563642557';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note" RENAME COLUMN "toIds" TO "to"`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note" RENAME COLUMN "to" TO "toIds"`
		);
	}
}
