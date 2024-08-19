import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeInstanceHostUnique1724098856006 implements MigrationInterface {
    name = 'MakeInstanceHostUnique1724098856006'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "instance" ADD CONSTRAINT "UQ_8d5afc98982185799b160e10ebe" UNIQUE ("host")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "instance" DROP CONSTRAINT "UQ_8d5afc98982185799b160e10ebe"`);
    }

}
