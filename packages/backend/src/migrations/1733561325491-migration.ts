import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1733561325491 implements MigrationInterface {
	name = 'Migration1733561325491';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note" ADD "toIds" character varying array`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "toIds"`);
	}
}
