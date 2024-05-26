import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserAuth1716684142544 implements MigrationInterface {
    name = 'AddUserAuth1716684142544'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_auth" RENAME COLUMN "expires" TO "created_at"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_auth" RENAME COLUMN "created_at" TO "expires"`);
    }

}
