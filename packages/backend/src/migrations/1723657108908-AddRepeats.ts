import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRepeats1723657108908 implements MigrationInterface {
    name = 'AddRepeats1723657108908'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "repeat" ("id" character varying NOT NULL, "ap_id" character varying NOT NULL, "created_at" character varying NOT NULL, "visibility" character varying NOT NULL DEFAULT 'public', "author" character varying NOT NULL, "local" boolean NOT NULL DEFAULT false, "note" character varying NOT NULL, CONSTRAINT "UQ_fe03b046979182d03a47d51d9d2" UNIQUE ("ap_id"), CONSTRAINT "PK_915d72d86811bfc4872f43dacda" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "repeat"`);
    }

}
