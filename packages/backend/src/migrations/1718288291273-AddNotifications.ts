import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNotifications1718288291273 implements MigrationInterface {
    name = 'AddNotifications1718288291273'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_notification" ("id" character varying NOT NULL, "to" character varying, "from" character varying, "type" character varying, "note" character varying, "user" character varying, CONSTRAINT "PK_958cc9572483cbcafcf0e36c5fa" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users_notification"`);
    }

}
