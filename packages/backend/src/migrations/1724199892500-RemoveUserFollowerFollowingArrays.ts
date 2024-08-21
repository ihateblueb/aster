import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUserFollowerFollowingArrays1724199892500 implements MigrationInterface {
    name = 'RemoveUserFollowerFollowingArrays1724199892500'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "following"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "followers"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "followers" text array`);
        await queryRunner.query(`ALTER TABLE "user" ADD "following" text array`);
    }

}
