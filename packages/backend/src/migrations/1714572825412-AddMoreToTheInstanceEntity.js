const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class AddMoreToTheInstanceEntity1714572825412 {
    name = 'AddMoreToTheInstanceEntity1714572825412'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "instances" ADD "user_count" integer`);
        await queryRunner.query(`ALTER TABLE "instances" ADD "note_count" integer`);
        await queryRunner.query(`ALTER TABLE "instances" ADD "responding" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "instances" ADD "host" text`);
        await queryRunner.query(`ALTER TABLE "instances" ADD "icon" text`);
        await queryRunner.query(`ALTER TABLE "instances" ADD "favicon" text`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "instances" DROP COLUMN "favicon"`);
        await queryRunner.query(`ALTER TABLE "instances" DROP COLUMN "icon"`);
        await queryRunner.query(`ALTER TABLE "instances" DROP COLUMN "host"`);
        await queryRunner.query(`ALTER TABLE "instances" DROP COLUMN "responding"`);
        await queryRunner.query(`ALTER TABLE "instances" DROP COLUMN "note_count"`);
        await queryRunner.query(`ALTER TABLE "instances" DROP COLUMN "user_count"`);
    }
}
