const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class AddPendingFollowers1714854873683 {
    name = 'AddPendingFollowers1714854873683'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "pending_followers" text array`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "pending_followers"`);
    }
}
