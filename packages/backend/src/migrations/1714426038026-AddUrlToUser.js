const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class AddBackLocal1714426038026 {
	name = 'AddBackLocal1714426038026';

	async up(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "users" ADD "url" character varying`
		);
	}

	async down(queryRunner) {
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "url"`);
	}
};
