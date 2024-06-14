import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFollowRequestObject1718327719850 implements MigrationInterface {
    name = 'AddFollowRequestObject1718327719850'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_notification" RENAME COLUMN "item" TO "object"`);
        await queryRunner.query(`ALTER TABLE "users_followrequest" ADD "object" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_followrequest" DROP COLUMN "object"`);
        await queryRunner.query(`ALTER TABLE "users_notification" RENAME COLUMN "object" TO "item"`);
    }

}
