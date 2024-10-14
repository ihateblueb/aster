import { MigrationInterface, QueryRunner } from "typeorm";

export class AddReplyingTo1728911795522 implements MigrationInterface {
    name = 'AddReplyingTo1728911795522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" ADD "replyingToId" character varying`);
        await queryRunner.query(`ALTER TABLE "note" ADD CONSTRAINT "FK_74d4e4017198657d73a3b3d864d" FOREIGN KEY ("replyingToId") REFERENCES "note"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" DROP CONSTRAINT "FK_74d4e4017198657d73a3b3d864d"`);
        await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "replyingToId"`);
    }

}
