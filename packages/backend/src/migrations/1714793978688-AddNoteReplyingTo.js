const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class AddNoteReplyingTo1714793978688 {
	name = 'AddNoteReplyingTo1714793978688';

	async up(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "notes" ADD "replying_to" character varying`
		);
	}

	async down(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "notes" DROP COLUMN "replying_to"`
		);
	}
};
