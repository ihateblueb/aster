import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1722865029078 implements MigrationInterface {
	name = 'Migrations1722865029078';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note" RENAME COLUMN "original_note" TO "quoted"`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note" RENAME COLUMN "quoted" TO "original_note"`
		);
	}
}
