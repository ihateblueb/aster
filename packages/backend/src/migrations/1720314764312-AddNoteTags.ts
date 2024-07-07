import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNoteTags1720314764312 implements MigrationInterface {
	name = 'AddNoteTags1720314764312';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "note" ADD "tags" jsonb`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "tags"`);
	}
}
