import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1736566207017 implements MigrationInterface {
	name = 'Migration1736566207017';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "report" ADD "resolved" boolean NOT NULL DEFAULT false`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "resolved"`);
	}
}
