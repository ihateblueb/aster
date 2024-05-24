import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNoteVisibility1716555544479 implements MigrationInterface {
    name = 'AddNoteVisibility1716555544479'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notes" ADD "visibility" character varying NOT NULL DEFAULT 'public'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "visibility"`);
    }

}
