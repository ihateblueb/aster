import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPinnedNotes1717540153510 implements MigrationInterface {
    name = 'AddPinnedNotes1717540153510'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "pinned_notes" text array`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "pinned_notes"`);
    }

}
