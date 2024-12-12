import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1733965202477 implements MigrationInterface {
    name = 'Migration1733965202477'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" DROP CONSTRAINT "FK_6c65c7c559c24751b791054b14e"`);
        await queryRunner.query(`ALTER TABLE "note" RENAME COLUMN "replyingToIdId" TO "replyIds"`);
        await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "replyIds"`);
        await queryRunner.query(`ALTER TABLE "note" ADD "replyIds" character varying array`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "replyIds"`);
        await queryRunner.query(`ALTER TABLE "note" ADD "replyIds" character varying`);
        await queryRunner.query(`ALTER TABLE "note" RENAME COLUMN "replyIds" TO "replyingToIdId"`);
        await queryRunner.query(`ALTER TABLE "note" ADD CONSTRAINT "FK_6c65c7c559c24751b791054b14e" FOREIGN KEY ("replyingToIdId") REFERENCES "note"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
