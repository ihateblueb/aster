const { MigrationInterface, QueryRunner } = require('typeorm')

module.exports = class AddPrivateKeyToUser1714264116782 {
	name = 'AddPrivateKeyToUser1714264116782'

	async up(queryRunner) {
		await queryRunner.query(`ALTER TABLE "users" ADD "privatekey" text`)
	}

	async down(queryRunner) {
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "privatekey"`)
	}
}
