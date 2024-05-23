import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1716435144223 implements MigrationInterface {
    name = 'Migrations1716435144223'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "inbox" character varying`);
        await queryRunner.query(`ALTER TABLE "notes" ADD "replies" text array`);
        await queryRunner.query(`ALTER TABLE "notes" ADD "repeats" text array`);
        await queryRunner.query(`ALTER TABLE "notes" ADD "quotes" text array`);
        await queryRunner.query(`ALTER TABLE "notes" ADD "likes" text array`);
        await queryRunner.query(`ALTER TABLE "notes" ADD "reactions" text array`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "reactions"`);
        await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "likes"`);
        await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "quotes"`);
        await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "repeats"`);
        await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "replies"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "inbox"`);
    }

}
