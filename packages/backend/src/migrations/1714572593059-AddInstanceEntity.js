const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class AddInstanceEntity1714572593059 {
	name = 'AddInstanceEntity1714572593059';

	async up(queryRunner) {
		await queryRunner.query(
			`CREATE TABLE "instances" ("id" SERIAL NOT NULL, "created_at" character varying, "updated_at" character varying, "last_communicated" character varying, "suspended" boolean DEFAULT false, "silenced" boolean DEFAULT false, "mod_note" text, "name" character varying, "description" text, "color" character varying, "maintainer" character varying, "maintainer_email" character varying, "software" character varying, "version" character varying, CONSTRAINT "PK_11862209053330b4765f7f54178" PRIMARY KEY ("id"))`
		);
	}

	async down(queryRunner) {
		await queryRunner.query(`DROP TABLE "instances"`);
	}
};
