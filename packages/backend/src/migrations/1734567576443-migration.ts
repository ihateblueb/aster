import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1734567576443 implements MigrationInterface {
	name = 'Migration1734567576443';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "sensitive"`);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "sensitive" boolean NOT NULL DEFAULT false`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "sensitive"`);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "sensitive" character varying NOT NULL DEFAULT false`
		);
	}
}
