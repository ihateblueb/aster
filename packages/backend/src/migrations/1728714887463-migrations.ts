import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1728714887463 implements MigrationInterface {
	name = 'Migrations1728714887463';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note" ADD "cw" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ALTER COLUMN "indexable" SET DEFAULT true`
		);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "bio"`);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "bio" character varying`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "bio"`);
		await queryRunner.query(`ALTER TABLE "user" ADD "bio" boolean`);
		await queryRunner.query(
			`ALTER TABLE "user" ALTER COLUMN "indexable" SET DEFAULT false`
		);
		await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "cw"`);
	}
}
