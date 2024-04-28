const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class Initial1714239954030 {
	name = 'Initial1714239954030';

	async up(queryRunner) {
		await queryRunner.query(
			`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying, "displayname" character varying, "avatar" text, "bio" text, "local" boolean, "publickey" text, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "notes" ("id" SERIAL NOT NULL, "timeposted" character varying, "author" character varying, "content" text, CONSTRAINT "PK_af6206538ea96c4e77e9f400c3d" PRIMARY KEY ("id"))`
		);
	}

	async down(queryRunner) {
		await queryRunner.query(`DROP TABLE "notes"`);
		await queryRunner.query(`DROP TABLE "users"`);
	}
};
