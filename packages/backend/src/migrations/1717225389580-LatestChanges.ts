import { MigrationInterface, QueryRunner } from 'typeorm';

export class LatestChanges1717225389580 implements MigrationInterface {
	name = 'LatestChanges1717225389580';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "users_auth" ADD "permissions" text array`
		);
		await queryRunner.query(
			`ALTER TABLE "roles" ADD "icon" character varying`
		);
		await queryRunner.query(
			`ALTER TABLE "roles" ADD "hidden" boolean NOT NULL DEFAULT true`
		);
		await queryRunner.query(
			`ALTER TABLE "notes" ADD "ap_id" character varying`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "ap_id"`);
		await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "hidden"`);
		await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "icon"`);
		await queryRunner.query(
			`ALTER TABLE "users_auth" DROP COLUMN "permissions"`
		);
	}
}
