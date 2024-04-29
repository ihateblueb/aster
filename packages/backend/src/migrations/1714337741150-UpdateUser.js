const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class UpdateUser1714337741150 {
	name = 'UpdateUser1714337741150';

	async up(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "users" ADD "suspended" boolean NOT NULL DEFAULT false`
		);
		await queryRunner.query(
			`ALTER TABLE "users" ADD "automated" boolean NOT NULL DEFAULT false`
		);
		await queryRunner.query(`ALTER TABLE "users" ADD "banner" text`);
		await queryRunner.query(
			`ALTER TABLE "users" ADD "createdat" character varying`
		);
		await queryRunner.query(`ALTER TABLE "notes" ADD "cw" text`);
		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "local" SET NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "local" SET DEFAULT false`
		);
	}

	async down(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "local" DROP DEFAULT`
		);
		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "local" DROP NOT NULL`
		);
		await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "cw"`);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdat"`);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "banner"`);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "automated"`);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "suspended"`);
	}
};
