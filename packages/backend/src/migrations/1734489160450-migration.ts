import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1734489160450 implements MigrationInterface {
    name = 'Migration1734489160450'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" RENAME COLUMN "attachmentIds" TO "mediaIds"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" RENAME COLUMN "mediaIds" TO "attachmentIds"`);
    }

}
