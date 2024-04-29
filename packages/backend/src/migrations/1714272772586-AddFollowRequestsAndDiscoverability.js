const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class AddFollowRequestsAndDiscoverability1714272772586 {
	name = 'AddFollowRequestsAndDiscoverability1714272772586';

	async up(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "users" ADD "followerapproval" boolean NOT NULL DEFAULT false`
		);
		await queryRunner.query(
			`ALTER TABLE "users" ADD "discoverable" boolean NOT NULL DEFAULT true`
		);
	}

	async down(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "users" DROP COLUMN "discoverable"`
		);
		await queryRunner.query(
			`ALTER TABLE "users" DROP COLUMN "followerapproval"`
		);
	}
};
