import { MigrationInterface, QueryRunner } from "typeorm";

export class AddApIdForReactAndLike1718637194671 implements MigrationInterface {
    name = 'AddApIdForReactAndLike1718637194671'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notes_react" ADD "ap_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notes_like" ADD "ap_id" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notes_like" DROP COLUMN "ap_id"`);
        await queryRunner.query(`ALTER TABLE "notes_react" DROP COLUMN "ap_id"`);
    }

}
