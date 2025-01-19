import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1737258260284 implements MigrationInterface {
    name = 'Migration1737258260284'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" RENAME COLUMN "origin" TO "receivedAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" RENAME COLUMN "receivedAt" TO "origin"`);
    }

}
