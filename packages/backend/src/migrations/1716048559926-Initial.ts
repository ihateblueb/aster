import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1716048559926 implements MigrationInterface {
	name = 'Initial1716048559926';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "users_priv" ("id" character varying NOT NULL, "private_key" character varying, "password" character varying, CONSTRAINT "PK_775251c70cc9d7e1029f813476f" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "meta" ("name" character varying NOT NULL, "created_at" character varying NOT NULL, "rules" text array, "description" character varying NOT NULL, "description_long" character varying NOT NULL, CONSTRAINT "PK_c6e1256d497c85128f622952708" PRIMARY KEY ("name"))`
		);
		await queryRunner.query(
			`CREATE TABLE "users" ("id" character varying NOT NULL, "ap_id" character varying, "username" character varying NOT NULL, "displayname" character varying, "local" boolean NOT NULL DEFAULT false, "url" character varying, "locked" boolean NOT NULL DEFAULT true, "suspended" boolean NOT NULL DEFAULT false, "deactivated" boolean NOT NULL DEFAULT false, "discoverable" boolean NOT NULL DEFAULT false, "automated" boolean NOT NULL DEFAULT false, "avatar" character varying, "banner" character varying, "background" character varying, "bio" character varying, "is_cat" boolean NOT NULL DEFAULT false, "speak_as_cat" boolean NOT NULL DEFAULT false, "created_at" character varying NOT NULL, "updated_at" character varying, "following" text array, "followers" text array, "pending_followers" text array, "public_key" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "notes" ("id" character varying NOT NULL, "created_at" character varying NOT NULL, "replying_to" character varying, "author" character varying NOT NULL, "local" boolean NOT NULL DEFAULT false, "cw" character varying, "content" character varying NOT NULL, CONSTRAINT "PK_af6206538ea96c4e77e9f400c3d" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "instances" ("id" character varying NOT NULL, "created_at" character varying NOT NULL, "updated_at" character varying, "last_communicated" character varying NOT NULL, "responding" boolean NOT NULL DEFAULT true, "user_count" integer, "note_count" integer, "suspended" boolean NOT NULL DEFAULT false, "silenced" boolean NOT NULL DEFAULT false, "mod_note" character varying, "host" character varying NOT NULL, "name" character varying, "description" character varying, "color" character varying, "maintainer" character varying, "maintainer_email" character varying, "software" character varying, "version" character varying, "icon" character varying, CONSTRAINT "PK_11862209053330b4765f7f54178" PRIMARY KEY ("id"))`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "instances"`);
		await queryRunner.query(`DROP TABLE "notes"`);
		await queryRunner.query(`DROP TABLE "users"`);
		await queryRunner.query(`DROP TABLE "meta"`);
		await queryRunner.query(`DROP TABLE "users_priv"`);
	}
}
