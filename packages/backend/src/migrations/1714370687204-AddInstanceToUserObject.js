const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class AddInstanceToUserObject1714370687204 {
	name = 'AddInstanceToUserObject1714370687204';

	async up(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "users" RENAME COLUMN "local" TO "instance"`
		);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "instance"`);
		await queryRunner.query(
			`ALTER TABLE "users" ADD "instance" character varying`
		);
	}

	async down(queryRunner) {
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "instance"`);
		await queryRunner.query(
			`ALTER TABLE "users" ADD "instance" boolean NOT NULL DEFAULT false`
		);
		await queryRunner.query(
			`ALTER TABLE "users" RENAME COLUMN "instance" TO "local"`
		);
	}
};
