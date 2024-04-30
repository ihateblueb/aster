const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class RenameFollowApprovalToLocked1714426245918 {
    name = 'RenameFollowApprovalToLocked1714426245918'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "followerapproval"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "locked" boolean NOT NULL DEFAULT false`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "locked"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "followerapproval" boolean NOT NULL DEFAULT false`);
    }
}
