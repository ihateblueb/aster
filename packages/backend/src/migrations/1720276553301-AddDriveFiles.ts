import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDriveFiles1720276553301 implements MigrationInterface {
    name = 'AddDriveFiles1720276553301'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "drive_file" ("id" character varying NOT NULL, "ap_id" character varying NOT NULL, "note" character varying, "user" character varying NOT NULL, "created_at" character varying NOT NULL, "updated_at" character varying NOT NULL, "src" character varying NOT NULL, "alt" character varying, CONSTRAINT "UQ_14d020c4958f659494d201d4d18" UNIQUE ("ap_id"), CONSTRAINT "PK_43ddaaaf18c9e68029b7cbb032e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "edits"`);
        await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "replies"`);
        await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "reactions"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" ADD "reactions" character varying`);
        await queryRunner.query(`ALTER TABLE "note" ADD "replies" character varying`);
        await queryRunner.query(`ALTER TABLE "note" ADD "edits" character varying`);
        await queryRunner.query(`DROP TABLE "drive_file"`);
    }

}
