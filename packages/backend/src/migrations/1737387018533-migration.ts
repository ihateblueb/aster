import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1737387018533 implements MigrationInterface {
    name = 'Migration1737387018533'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" ADD "attachments" character varying array`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "attachments"`);
    }

}
