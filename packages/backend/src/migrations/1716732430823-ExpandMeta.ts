import { MigrationInterface, QueryRunner } from 'typeorm';

export class ExpandMeta1716732430823 implements MigrationInterface {
	name = 'ExpandMeta1716732430823';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "meta" ADD "color" character varying`
		);
		await queryRunner.query(
			`ALTER TABLE "meta" ADD "maintainer" character varying`
		);
		await queryRunner.query(
			`ALTER TABLE "meta" ADD "maintainer_email" character varying`
		);
		await queryRunner.query(
			`ALTER TABLE "meta" ADD "registration" character varying NOT NULL DEFAULT 'closed'`
		);
		await queryRunner.query(
			`ALTER TABLE "meta" ALTER COLUMN "description" DROP NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "meta" ALTER COLUMN "description_long" DROP NOT NULL`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "meta" ALTER COLUMN "description_long" SET NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "meta" ALTER COLUMN "description" SET NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "meta" DROP COLUMN "registration"`
		);
		await queryRunner.query(
			`ALTER TABLE "meta" DROP COLUMN "maintainer_email"`
		);
		await queryRunner.query(`ALTER TABLE "meta" DROP COLUMN "maintainer"`);
		await queryRunner.query(`ALTER TABLE "meta" DROP COLUMN "color"`);
	}
}
