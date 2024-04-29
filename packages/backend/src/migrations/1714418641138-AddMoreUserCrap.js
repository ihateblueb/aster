const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class AddMoreUserCrapForApId1714418641138 {
	name = 'AddMoreUserCrapForApId1714418641138';

	async up(queryRunner) {
		await queryRunner.query(`ALTER TABLE "users" ADD "background" text`);
		await queryRunner.query(
			`ALTER TABLE "users" ADD "iscat" boolean NOT NULL DEFAULT false`
		);
		await queryRunner.query(
			`ALTER TABLE "users" ADD "speakascat" boolean NOT NULL DEFAULT false`
		);
	}

	async down(queryRunner) {
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "speakascat"`);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "iscat"`);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "background"`);
	}
};
