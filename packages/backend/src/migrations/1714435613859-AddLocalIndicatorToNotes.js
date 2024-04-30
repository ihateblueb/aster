const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class AddLocalIndicatorToNotes1714435613859 {
	name = 'AddLocalIndicatorToNotes1714435613859';

	async up(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "notes" ADD "local" character varying`
		);
	}

	async down(queryRunner) {
		await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "local"`);
	}
};
