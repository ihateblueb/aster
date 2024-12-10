import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1733796834997 implements MigrationInterface {
    name = 'Migration1733796834997'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" ADD "replyIds" character varying array`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "replyIds"`);
    }

}
