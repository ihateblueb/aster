const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class AddBackLocal1714424553838 {
	name = 'AddBackLocal1714424553838';

	async up(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "users" ADD "local" boolean DEFAULT false`
		);
	}

	async down(queryRunner) {
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "local"`);
	}
};
