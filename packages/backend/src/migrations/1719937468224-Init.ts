import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1719937468224 implements MigrationInterface {
    name = 'Init1719937468224'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_pref" ("id" character varying NOT NULL, "prefs" jsonb, CONSTRAINT "PK_34808e3045618dd0cf3ca027b36" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_priv" ("id" character varying NOT NULL, "private_key" character varying NOT NULL, "password" character varying, CONSTRAINT "PK_c4a662dada2a44074e94600aaac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_notification" ("id" character varying NOT NULL, "to" character varying NOT NULL, "from" character varying NOT NULL, "type" character varying NOT NULL, "time" character varying, "object" character varying, "reaction" character varying, CONSTRAINT "PK_8840aac86dec5f669c541ce67d4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_followrequest" ("id" character varying NOT NULL, "to" character varying NOT NULL, "from" character varying NOT NULL, "time" character varying NOT NULL, "object" character varying, CONSTRAINT "PK_2820086ce530e5643ed646028cb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_auth" ("id" character varying NOT NULL, "user" character varying NOT NULL, "created_at" character varying NOT NULL, "used_at" text array, "token" character varying NOT NULL, "permissions" text array, CONSTRAINT "PK_56d00ec31dc3eed1c3f6bff4f58" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" character varying NOT NULL, "ap_id" character varying NOT NULL, "inbox" character varying NOT NULL, "outbox" character varying NOT NULL, "username" character varying NOT NULL, "host" character varying NOT NULL, "displayname" character varying, "local" boolean NOT NULL DEFAULT false, "url" character varying NOT NULL, "locked" boolean NOT NULL DEFAULT true, "suspended" boolean NOT NULL DEFAULT false, "deactivated" boolean NOT NULL DEFAULT false, "discoverable" boolean NOT NULL DEFAULT false, "indexable" boolean NOT NULL DEFAULT false, "automated" boolean NOT NULL DEFAULT false, "avatar" character varying, "avatar_alt" character varying, "banner" character varying, "banner_alt" character varying, "background" character varying, "background_alt" character varying, "bio" character varying, "location" character varying, "birthday" character varying, "is_cat" boolean NOT NULL DEFAULT false, "speak_as_cat" boolean NOT NULL DEFAULT false, "created_at" character varying NOT NULL, "updated_at" character varying, "following_url" character varying NOT NULL, "following" text array, "followers_url" character varying NOT NULL, "followers" text array, "roles" text array, "pinned_notes" text array, "metadata" jsonb, "total_notes" integer DEFAULT '0', "total_followers" integer DEFAULT '0', "total_following" integer DEFAULT '0', "public_key" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" character varying NOT NULL, "name" character varying NOT NULL, "color" character varying, "icon" character varying, "hidden" boolean NOT NULL, "users" text array, "permissions" text array, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "note_edit" ("id" character varying NOT NULL, "note" character varying NOT NULL, "created_at" character varying NOT NULL, "cw" character varying, "content" character varying NOT NULL, CONSTRAINT "PK_736fc6e0d4e222ecc6f82058e08" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "note" ("id" character varying NOT NULL, "ap_id" character varying, "created_at" character varying NOT NULL, "visibility" character varying NOT NULL DEFAULT 'public', "replying_to" character varying, "author" character varying NOT NULL, "local" boolean NOT NULL DEFAULT false, "cw" character varying, "content" character varying NOT NULL, "edits" character varying, "replies" character varying, "reactions" character varying, "original_note" character varying, CONSTRAINT "PK_96d0c172a4fba276b1bbed43058" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "meta" ("name" character varying NOT NULL, "created_at" character varying NOT NULL, "color" character varying, "maintainer" character varying, "maintainer_email" character varying, "registration" character varying NOT NULL DEFAULT 'closed', "rules" text array, "description" character varying, "description_long" character varying, "local_user_count" integer NOT NULL DEFAULT '0', "total_user_count" integer NOT NULL DEFAULT '0', "local_note_count" integer NOT NULL DEFAULT '0', "total_note_count" integer NOT NULL DEFAULT '0', "instance_count" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_c6e1256d497c85128f622952708" PRIMARY KEY ("name"))`);
        await queryRunner.query(`CREATE TABLE "instance" ("id" character varying NOT NULL, "created_at" character varying NOT NULL, "updated_at" character varying, "last_communicated" character varying NOT NULL, "responding" boolean NOT NULL DEFAULT true, "user_count" integer, "note_count" integer, "suspended" boolean NOT NULL DEFAULT false, "silenced" boolean NOT NULL DEFAULT false, "mod_note" character varying, "host" character varying NOT NULL, "name" character varying, "description" character varying, "color" character varying, "maintainer" character varying, "maintainer_email" character varying, "software" character varying, "version" character varying, "icon" character varying, CONSTRAINT "PK_eaf60e4a0c399c9935413e06474" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "emoji" ("id" character varying NOT NULL, "ap_id" character varying NOT NULL, "created_at" character varying NOT NULL, "updated_at" character varying NOT NULL, "local" character varying NOT NULL, "host" character varying NOT NULL, "name" character varying NOT NULL, "url" character varying NOT NULL, "mime" character varying NOT NULL, CONSTRAINT "PK_df74ce05e24999ee01ea0bc50a3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "note_react" ("id" character varying NOT NULL, "ap_id" character varying NOT NULL, "note" character varying NOT NULL, "created_at" character varying NOT NULL, "user" character varying NOT NULL, CONSTRAINT "PK_4f10b40fa455ab13ab338508237" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ad" ("id" character varying NOT NULL, "created_at" character varying, "expire_at" character varying, "url" character varying, "alt" character varying, "link" character varying, "comment" character varying, CONSTRAINT "PK_0193d5ef09746e88e9ea92c634d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "activity" ("id" character varying NOT NULL, "object" jsonb NOT NULL, CONSTRAINT "PK_24625a1d6b1b089c8ae206fe467" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "activity"`);
        await queryRunner.query(`DROP TABLE "ad"`);
        await queryRunner.query(`DROP TABLE "note_react"`);
        await queryRunner.query(`DROP TABLE "emoji"`);
        await queryRunner.query(`DROP TABLE "instance"`);
        await queryRunner.query(`DROP TABLE "meta"`);
        await queryRunner.query(`DROP TABLE "note"`);
        await queryRunner.query(`DROP TABLE "note_edit"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "user_auth"`);
        await queryRunner.query(`DROP TABLE "user_followrequest"`);
        await queryRunner.query(`DROP TABLE "user_notification"`);
        await queryRunner.query(`DROP TABLE "user_priv"`);
        await queryRunner.query(`DROP TABLE "user_pref"`);
    }

}
