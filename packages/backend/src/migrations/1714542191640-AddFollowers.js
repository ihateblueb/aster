const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class AddFollowers1714542191640 {
    name = 'AddFollowers1714542191640'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "following" text`);
        await queryRunner.query(`ALTER TABLE "users" ADD "followers" text array`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "followers"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "following"`);
    }
}
