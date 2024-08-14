import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeRoleType1723225962376 implements MigrationInterface {
	name = 'ChangeRoleType1723225962376';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "roles"`);
		await queryRunner.query(`ALTER TABLE "user" ADD "roles" jsonb`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "roles"`);
		await queryRunner.query(`ALTER TABLE "user" ADD "roles" text array`);
	}
}
