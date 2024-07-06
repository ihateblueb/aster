import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameMimeToTypeOnEmoji1720284449442 implements MigrationInterface {
    name = 'RenameMimeToTypeOnEmoji1720284449442'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "emoji" RENAME COLUMN "mime" TO "type"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "emoji" RENAME COLUMN "type" TO "mime"`);
    }

}
