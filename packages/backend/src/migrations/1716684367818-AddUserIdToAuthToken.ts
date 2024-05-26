import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserIdToAuthToken1716684367818 implements MigrationInterface {
    name = 'AddUserIdToAuthToken1716684367818'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_auth" ADD "user" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_auth" DROP COLUMN "user"`);
    }

}
