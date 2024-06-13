import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFollowRequests1718296050511 implements MigrationInterface {
    name = 'AddFollowRequests1718296050511'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_followrequest" ("id" character varying NOT NULL, "to" character varying, "from" character varying, "time" character varying, CONSTRAINT "PK_3c52b81103d9fe5612dfd01f52b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users_notification" DROP COLUMN "note"`);
        await queryRunner.query(`ALTER TABLE "users_notification" DROP COLUMN "user"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "pending_followers"`);
        await queryRunner.query(`ALTER TABLE "users_notification" ADD "item" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_notification" DROP COLUMN "item"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "pending_followers" text array`);
        await queryRunner.query(`ALTER TABLE "users_notification" ADD "user" character varying`);
        await queryRunner.query(`ALTER TABLE "users_notification" ADD "note" character varying`);
        await queryRunner.query(`DROP TABLE "users_followrequest"`);
    }

}
