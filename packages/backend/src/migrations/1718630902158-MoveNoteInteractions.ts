import { MigrationInterface, QueryRunner } from "typeorm";

export class MoveNoteInteractions1718630902158 implements MigrationInterface {
    name = 'MoveNoteInteractions1718630902158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "notes_react" ("id" character varying NOT NULL, "note" character varying, "created_at" character varying, "emoji" character varying, "user" character varying, CONSTRAINT "PK_02646b8642b992bafb63afeaa92" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notes_like" ("id" character varying NOT NULL, "note" character varying, "created_at" character varying, "user" character varying, CONSTRAINT "PK_740898f200bd4fa99e22b260103" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "replies"`);
        await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "repeats"`);
        await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "quotes"`);
        await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "likes"`);
        await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "reactions"`);
        await queryRunner.query(`ALTER TABLE "notes" ADD "original_note" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "original_note"`);
        await queryRunner.query(`ALTER TABLE "notes" ADD "reactions" text array`);
        await queryRunner.query(`ALTER TABLE "notes" ADD "likes" text array`);
        await queryRunner.query(`ALTER TABLE "notes" ADD "quotes" text array`);
        await queryRunner.query(`ALTER TABLE "notes" ADD "repeats" text array`);
        await queryRunner.query(`ALTER TABLE "notes" ADD "replies" text array`);
        await queryRunner.query(`DROP TABLE "notes_like"`);
        await queryRunner.query(`DROP TABLE "notes_react"`);
    }

}
