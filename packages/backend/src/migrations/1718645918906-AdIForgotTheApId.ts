import { MigrationInterface, QueryRunner } from "typeorm";

export class AdIForgotTheApId1718645918906 implements MigrationInterface {
    name = 'AdIForgotTheApId1718645918906'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "emojis" ADD "ap_id" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "emojis" DROP COLUMN "ap_id"`);
    }

}
