const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class AddUnderscoresToMultiworded1714440163252 {
	async up(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "users" RENAME COLUMN "apid" TO "ap_id"`
		);
		await queryRunner.query(
			`ALTER TABLE "users" RENAME COLUMN "iscat" TO "is_cat"`
		);
		await queryRunner.query(
			`ALTER TABLE "users" RENAME COLUMN "speakascat" TO "speak_as_cat"`
		);
		await queryRunner.query(
			`ALTER TABLE "users" RENAME COLUMN "createdat" TO "created_at"`
		);
		await queryRunner.query(
			`ALTER TABLE "users" RENAME COLUMN "publickey" TO "public_key"`
		);
		await queryRunner.query(
			`ALTER TABLE "users" RENAME COLUMN "privatekey" TO "private_key"`
		);
		await queryRunner.query(
			`ALTER TABLE "notes" RENAME COLUMN "timeposted" TO "created_at"`
		);
	}

	async down(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "users" RENAME COLUMN "ap_id" TO "apid"`
		);
		await queryRunner.query(
			`ALTER TABLE "users" RENAME COLUMN "is_cat" TO "iscat"`
		);
		await queryRunner.query(
			`ALTER TABLE "users" RENAME COLUMN "speak_as_cat" TO "speakascat"`
		);
		await queryRunner.query(
			`ALTER TABLE "users" RENAME COLUMN "created_at" TO "createdat"`
		);
		await queryRunner.query(
			`ALTER TABLE "users" RENAME COLUMN "public_key" TO "publickey"`
		);
		await queryRunner.query(
			`ALTER TABLE "users" RENAME COLUMN "private_key" TO "privatekey"`
		);
		await queryRunner.query(
			`ALTER TABLE "notes" RENAME COLUMN "created_at" TO "timeposted"`
		);
	}
};
