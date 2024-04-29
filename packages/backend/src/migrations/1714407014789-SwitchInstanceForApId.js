const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class SwitchInstanceForApId1714407014789 {
	name = 'SwitchInstanceForApId1714407014789';

	async up(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "users" RENAME COLUMN "instance" TO "apid"`
		);
	}

	async down(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "users" RENAME COLUMN "apid" TO "instance"`
		);
	}
};
