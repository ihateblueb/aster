const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class AddUserDeactivation1714342268426 {
    name = 'AddUserDeactivation1714342268426'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "deactivated" boolean NOT NULL DEFAULT false`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deactivated"`);
    }
}
