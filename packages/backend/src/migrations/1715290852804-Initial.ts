import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1715290852804 implements MigrationInterface {
    name = 'Initial1715290852804'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ap_id" character varying NOT NULL, "username" character varying NOT NULL, "displayname" character varying NOT NULL, "local" boolean NOT NULL DEFAULT false, "url" character varying NOT NULL, "locked" boolean NOT NULL DEFAULT true, "suspended" boolean NOT NULL DEFAULT false, "deactivated" boolean NOT NULL DEFAULT false, "discoverable" boolean NOT NULL DEFAULT false, "automated" boolean NOT NULL DEFAULT false, "avatar" character varying NOT NULL, "banner" character varying NOT NULL, "background" character varying NOT NULL, "bio" character varying NOT NULL, "is_cat" boolean NOT NULL DEFAULT false, "speak_as_cat" boolean NOT NULL DEFAULT false, "created_at" character varying NOT NULL, "updated_at" character varying NOT NULL, "following" text array NOT NULL, "followers" text array NOT NULL, "pending_followers" text array NOT NULL, "public_key" character varying NOT NULL, "private_key" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "note" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" character varying NOT NULL, "replying_to" character varying NOT NULL, "author" character varying NOT NULL, "local" boolean NOT NULL DEFAULT false, "cw" character varying NOT NULL, "content" character varying NOT NULL, CONSTRAINT "PK_96d0c172a4fba276b1bbed43058" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "instance" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" character varying NOT NULL, "updated_at" character varying NOT NULL, "last_communicated" character varying NOT NULL, "responding" boolean NOT NULL DEFAULT true, "user_count" integer NOT NULL, "note_count" integer NOT NULL, "suspended" boolean NOT NULL DEFAULT false, "silenced" boolean NOT NULL DEFAULT false, "mod_note" character varying NOT NULL, "host" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "color" character varying NOT NULL, "maintainer" character varying NOT NULL, "maintainer_email" character varying NOT NULL, "software" character varying NOT NULL, "version" character varying NOT NULL, "icon" character varying NOT NULL, CONSTRAINT "PK_eaf60e4a0c399c9935413e06474" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "instance"`);
        await queryRunner.query(`DROP TABLE "note"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
