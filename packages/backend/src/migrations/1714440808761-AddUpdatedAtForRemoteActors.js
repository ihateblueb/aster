const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class AddUpdatedAtForRemoteActors1714440808761 {
    name = 'AddUpdatedAtForRemoteActors1714440808761'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "updated_at" character varying`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
    }
}
