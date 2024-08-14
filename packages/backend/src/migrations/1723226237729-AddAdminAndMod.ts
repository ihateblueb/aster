import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAdminAndMod1723226237729 implements MigrationInterface {
	name = 'AddAdminAndMod1723226237729';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "user" ADD "admin" boolean NOT NULL DEFAULT false`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "mod" boolean NOT NULL DEFAULT false`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "mod"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "admin"`);
	}
}
