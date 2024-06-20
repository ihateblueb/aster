import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1718892396801 implements MigrationInterface {
	name = 'Init1718892396801';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "users_priv" ("id" character varying NOT NULL, "private_key" character varying, "password" character varying, CONSTRAINT "PK_775251c70cc9d7e1029f813476f" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "users_pref" ("id" character varying NOT NULL, "prefs" text array, CONSTRAINT "PK_dca6d286f39876407ede7884a72" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "roles" ("id" character varying NOT NULL, "name" character varying NOT NULL, "color" character varying, "icon" character varying, "hidden" boolean NOT NULL DEFAULT true, "users" text array, "permissions" text array, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "notes_edit" ("id" character varying NOT NULL, "created_at" character varying, "cw" text array, "content" character varying, "permissions" text array, CONSTRAINT "PK_fdade8b9bb8cef45a19b8f72568" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "notes" ("id" character varying NOT NULL, "ap_id" character varying, "created_at" character varying NOT NULL, "visibility" character varying NOT NULL DEFAULT 'public', "replying_to" character varying, "local" boolean NOT NULL DEFAULT false, "cw" character varying, "content" character varying NOT NULL, "editsId" character varying, CONSTRAINT "PK_af6206538ea96c4e77e9f400c3d" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "users" ("id" character varying NOT NULL, "ap_id" character varying, "inbox" character varying, "username" character varying NOT NULL, "host" character varying, "displayname" character varying, "local" boolean NOT NULL DEFAULT false, "url" character varying, "locked" boolean NOT NULL DEFAULT true, "suspended" boolean NOT NULL DEFAULT false, "deactivated" boolean NOT NULL DEFAULT false, "discoverable" boolean NOT NULL DEFAULT false, "automated" boolean NOT NULL DEFAULT false, "avatar" character varying, "banner" character varying, "background" character varying, "bio" character varying, "is_cat" boolean NOT NULL DEFAULT false, "speak_as_cat" boolean NOT NULL DEFAULT false, "created_at" character varying NOT NULL, "updated_at" character varying, "following_url" character varying NOT NULL, "following" text array, "followers_url" character varying NOT NULL, "followers" text array, "roles" text array, "total_notes" integer, "total_followers" integer, "total_following" integer, "metadata" text array, "public_key" character varying NOT NULL, "pinnedNotesId" character varying, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "notes_like" ("id" character varying NOT NULL, "ap_id" character varying NOT NULL, "created_at" character varying, "user" character varying, CONSTRAINT "PK_740898f200bd4fa99e22b260103" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "users_notification" ("id" character varying NOT NULL, "type" character varying, "time" character varying, "object" character varying, "reaction" character varying, CONSTRAINT "PK_958cc9572483cbcafcf0e36c5fa" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "users_followrequest" ("id" character varying NOT NULL, "time" character varying, "object" character varying, CONSTRAINT "PK_3c52b81103d9fe5612dfd01f52b" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "users_auth" ("id" character varying NOT NULL, "created_at" character varying, "used_at" text array, "token" character varying, "permissions" text array, CONSTRAINT "PK_32ddc1ae708e8261a870a6eb3e6" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "meta" ("name" character varying NOT NULL, "created_at" character varying NOT NULL, "color" character varying, "maintainer" character varying, "maintainer_email" character varying, "registration" character varying NOT NULL DEFAULT 'closed', "rules" text array, "description" character varying, "description_long" character varying, "init" boolean NOT NULL DEFAULT false, "local_user_count" integer, "total_user_count" integer, "local_note_count" integer, "total__count" integer, "instance_count" integer, CONSTRAINT "PK_c6e1256d497c85128f622952708" PRIMARY KEY ("name"))`
		);
		await queryRunner.query(
			`CREATE TABLE "instances" ("id" character varying NOT NULL, "created_at" character varying NOT NULL, "updated_at" character varying, "last_communicated" character varying NOT NULL, "responding" boolean NOT NULL DEFAULT true, "user_count" integer, "note_count" integer, "suspended" boolean NOT NULL DEFAULT false, "silenced" boolean NOT NULL DEFAULT false, "mod_note" character varying, "host" character varying NOT NULL, "name" character varying, "description" character varying, "color" character varying, "maintainer" character varying, "maintainer_email" character varying, "software" character varying, "version" character varying, "icon" character varying, CONSTRAINT "PK_11862209053330b4765f7f54178" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "emojis" ("id" character varying NOT NULL, "ap_id" character varying, "created_at" character varying, "updated_at" character varying, "local" character varying, "host" character varying, "name" character varying, "url" character varying, CONSTRAINT "PK_9adb96a675f555c6169bad7ba62" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "notes_react" ("id" character varying NOT NULL, "ap_id" character varying NOT NULL, "created_at" character varying, "user" character varying, "emojiId" character varying, CONSTRAINT "PK_02646b8642b992bafb63afeaa92" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "ads" ("id" character varying NOT NULL, "created_at" character varying, "expire_at" character varying, "url" character varying, "alt" character varying, "link" character varying, "comment" character varying, CONSTRAINT "PK_a7af7d1998037a97076f758fc23" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`ALTER TABLE "notes" ADD CONSTRAINT "FK_c0006564767ec73a24fc114465b" FOREIGN KEY ("editsId") REFERENCES "notes_edit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "users" ADD CONSTRAINT "FK_43acd8ac043567c77174fedcc14" FOREIGN KEY ("pinnedNotesId") REFERENCES "notes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "notes_react" ADD CONSTRAINT "FK_e951c0a4e24349e4f26af09c571" FOREIGN KEY ("emojiId") REFERENCES "emojis"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "notes_react" DROP CONSTRAINT "FK_e951c0a4e24349e4f26af09c571"`
		);
		await queryRunner.query(
			`ALTER TABLE "users" DROP CONSTRAINT "FK_43acd8ac043567c77174fedcc14"`
		);
		await queryRunner.query(
			`ALTER TABLE "notes" DROP CONSTRAINT "FK_c0006564767ec73a24fc114465b"`
		);
		await queryRunner.query(`DROP TABLE "ads"`);
		await queryRunner.query(`DROP TABLE "notes_react"`);
		await queryRunner.query(`DROP TABLE "emojis"`);
		await queryRunner.query(`DROP TABLE "instances"`);
		await queryRunner.query(`DROP TABLE "meta"`);
		await queryRunner.query(`DROP TABLE "users_auth"`);
		await queryRunner.query(`DROP TABLE "users_followrequest"`);
		await queryRunner.query(`DROP TABLE "users_notification"`);
		await queryRunner.query(`DROP TABLE "notes_like"`);
		await queryRunner.query(`DROP TABLE "users"`);
		await queryRunner.query(`DROP TABLE "notes"`);
		await queryRunner.query(`DROP TABLE "notes_edit"`);
		await queryRunner.query(`DROP TABLE "roles"`);
		await queryRunner.query(`DROP TABLE "users_pref"`);
		await queryRunner.query(`DROP TABLE "users_priv"`);
	}
}
